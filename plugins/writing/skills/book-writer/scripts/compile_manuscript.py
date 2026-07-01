#!/usr/bin/env python3
"""
compile_manuscript.py — assemble chapter files into a single manuscript.

Usage:
    python compile_manuscript.py <book-dir>/ [options]

Options:
    --docx          Also produce manuscript.docx (requires pandoc)
    --epub          Also produce manuscript.epub (requires pandoc)
    --report        Print per-chapter word counts and total
    --no-toc        Don't include a table of contents in epub/docx
    --strip-scaffold  Remove <!-- scaffold ... --> blocks (default: on)

What it does:
    - Reads <book-dir>/book-spec.md to extract title, author, language
    - Reads every <book-dir>/chapters/*.md, sorted by leading number
    - Strips scaffold comment blocks from each chapter
    - Writes <book-dir>/manuscript.md with a title page + chapters
    - Optionally invokes pandoc to produce .docx and .epub

The chapter file naming convention is `NN-slug.md` where NN is a zero-padded
number. `00-front-matter.md` and `99-back-matter.md` are conventional but
optional — anything matching the pattern is included in numeric order.
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path


SCAFFOLD_RE = re.compile(r"<!--\s*scaffold.*?-->", re.DOTALL | re.IGNORECASE)
CHAPTER_FILENAME_RE = re.compile(r"^(\d+)-.*\.md$")


def read_spec(book_dir: Path) -> dict:
    """Pull title, author, language from book-spec.md. Best-effort regex."""
    spec_path = book_dir / "book-spec.md"
    if not spec_path.exists():
        return {"title": book_dir.name, "author": "", "language": ""}

    text = spec_path.read_text(encoding="utf-8")
    spec = {"title": book_dir.name, "author": "", "language": ""}

    # Look for "## Working title" then take the next non-blank line.
    patterns = {
        "title": r"##\s*Working title\s*\n+\s*(.+)",
        "author": r"##\s*Author.*?\n+\s*(.+)",
        "language": r"##\s*Language\s*\n+\s*(.+)",
    }
    for key, pat in patterns.items():
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            value = m.group(1).strip()
            # Skip placeholder values like [Title — fine to revise later]
            if not (value.startswith("[") and value.endswith("]")):
                spec[key] = value
    return spec


def list_chapter_files(book_dir: Path) -> list[Path]:
    chapters_dir = book_dir / "chapters"
    if not chapters_dir.is_dir():
        return []
    files = [
        p for p in chapters_dir.iterdir()
        if p.is_file() and CHAPTER_FILENAME_RE.match(p.name)
    ]
    return sorted(files, key=lambda p: int(CHAPTER_FILENAME_RE.match(p.name).group(1)))


def strip_scaffold(text: str) -> str:
    return SCAFFOLD_RE.sub("", text).lstrip("\n")


def word_count(text: str) -> int:
    # Strip markdown headings and emphasis markers for a fairer count.
    plain = re.sub(r"[#*_`>]", " ", text)
    return len(plain.split())


def build_manuscript(
    book_dir: Path,
    *,
    strip_scaffolds: bool = True,
) -> tuple[str, list[tuple[str, int]]]:
    """Return (manuscript_text, [(chapter_filename, word_count), ...])."""
    spec = read_spec(book_dir)
    chapter_files = list_chapter_files(book_dir)

    if not chapter_files:
        raise SystemExit(
            f"No chapter files found in {book_dir / 'chapters'}/. "
            f"Expected files like '01-slug.md'."
        )

    parts: list[str] = []

    # Title page
    parts.append(f"# {spec['title']}\n")
    if spec["author"]:
        parts.append(f"\n_{spec['author']}_\n")
    parts.append("\n\\newpage\n\n")

    chapter_stats: list[tuple[str, int]] = []
    for ch_path in chapter_files:
        text = ch_path.read_text(encoding="utf-8")
        if strip_scaffolds:
            text = strip_scaffold(text)
        chapter_stats.append((ch_path.name, word_count(text)))
        parts.append(text.rstrip() + "\n\n\\newpage\n\n")

    return "".join(parts), chapter_stats


def run_pandoc(
    src: Path, dst: Path, *, language: str = "", include_toc: bool = True
) -> None:
    if not _pandoc_available():
        print(
            f"  pandoc not found; skipping {dst.suffix} output. "
            f"Install pandoc to enable.",
            file=sys.stderr,
        )
        return
    cmd = ["pandoc", str(src), "-o", str(dst), "--standalone"]
    if include_toc:
        cmd.append("--toc")
    if language:
        cmd.extend(["-V", f"lang={language}"])
    try:
        subprocess.run(cmd, check=True)
        print(f"  wrote {dst}")
    except subprocess.CalledProcessError as e:
        print(f"  pandoc failed for {dst}: {e}", file=sys.stderr)


def _pandoc_available() -> bool:
    try:
        subprocess.run(
            ["pandoc", "--version"],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        return True
    except (FileNotFoundError, subprocess.CalledProcessError):
        return False


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("book_dir", type=Path, help="Path to the book project directory")
    parser.add_argument("--docx", action="store_true", help="Also produce .docx")
    parser.add_argument("--epub", action="store_true", help="Also produce .epub")
    parser.add_argument("--report", action="store_true", help="Print word count report")
    parser.add_argument(
        "--no-toc",
        action="store_true",
        help="Don't include table of contents in pandoc outputs",
    )
    parser.add_argument(
        "--no-strip-scaffold",
        action="store_true",
        help="Keep <!-- scaffold ... --> blocks in the output",
    )
    args = parser.parse_args()

    book_dir = args.book_dir.resolve()
    if not book_dir.is_dir():
        print(f"Not a directory: {book_dir}", file=sys.stderr)
        return 1

    manuscript_text, stats = build_manuscript(
        book_dir,
        strip_scaffolds=not args.no_strip_scaffold,
    )

    out_md = book_dir / "manuscript.md"
    out_md.write_text(manuscript_text, encoding="utf-8")
    print(f"wrote {out_md}")

    if args.docx:
        run_pandoc(
            out_md,
            book_dir / "manuscript.docx",
            language=read_spec(book_dir)["language"],
            include_toc=not args.no_toc,
        )
    if args.epub:
        run_pandoc(
            out_md,
            book_dir / "manuscript.epub",
            language=read_spec(book_dir)["language"],
            include_toc=not args.no_toc,
        )

    if args.report or not (args.docx or args.epub):
        print()
        print(f"{'Chapter':<40} {'Words':>8}")
        print("-" * 50)
        total = 0
        for name, count in stats:
            print(f"{name:<40} {count:>8,}")
            total += count
        print("-" * 50)
        print(f"{'Total':<40} {total:>8,}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
