from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "banner"
OUT.mkdir(parents=True, exist_ok=True)

PDF = OUT / "evlv-unique-gym-banner-5x3ft-print.pdf"
LOGO = ROOT / "public" / "logo" / "evlv-logo-light.png"

PT = 72
W, H = 60 * PT, 36 * PT

OBSIDIAN = HexColor("#0E1113")
FACET_DARK = HexColor("#151A1D")
FACET_LIGHT = HexColor("#1B2125")
WHITE = HexColor("#FFFFFF")


def tracked_width(text: str, font: str, size: float, tracking: float) -> float:
    return pdfmetrics.stringWidth(text, font, size) + max(0, len(text) - 1) * tracking


def draw_tracked_centered(c: canvas.Canvas, y: float, text: str, font: str, size: float, tracking: float) -> None:
    width = tracked_width(text, font, size, tracking)
    line = c.beginText((W - width) / 2, y)
    line.setFont(font, size)
    line.setCharSpace(tracking)
    line.textOut(text)
    c.drawText(line)


def draw_polygon(c: canvas.Canvas, points: tuple[tuple[float, float], ...]) -> None:
    path = c.beginPath()
    first_x, first_y = points[0]
    path.moveTo(first_x * PT, first_y * PT)
    for x, y in points[1:]:
        path.lineTo(x * PT, y * PT)
    path.close()
    c.drawPath(path, fill=1, stroke=0)


def create() -> None:
    pdfmetrics.registerFont(TTFont("EVLV-Light", r"C:\Windows\Fonts\Poppins-Light.ttf"))
    pdfmetrics.registerFont(TTFont("EVLV-Regular", r"C:\Windows\Fonts\Poppins-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("EVLV-Medium", r"C:\Windows\Fonts\Poppins-Medium.ttf"))
    pdfmetrics.registerFont(TTFont("EVLV-Bold", r"C:\Windows\Fonts\Poppins-Bold.ttf"))

    c = canvas.Canvas(str(PDF), pagesize=(W, H), pageCompression=1)
    c.setTitle("EVLV Unique Gym Banner - 5 x 3 ft")
    c.setAuthor("EVLV")

    # Monochrome production field with tonal facets based on the diagonal cuts
    # in the EVLV wordmark. This is a wholly new composition, not a revision of
    # the competitor-derived crest layout.
    c.setFillColor(OBSIDIAN)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    c.setFillColor(FACET_DARK)
    draw_polygon(c, ((-5, 36), (7, 36), (25.5, 18), (7, 0), (-5, 0), (14.2, 18)))
    draw_polygon(c, ((65, 36), (53, 36), (34.5, 18), (53, 0), (65, 0), (45.8, 18)))
    c.setFillColor(FACET_LIGHT)
    draw_polygon(c, ((2, 36), (8.2, 36), (27.7, 18), (8.2, 0), (2, 0), (20.9, 18)))
    draw_polygon(c, ((58, 36), (51.8, 36), (32.3, 18), (51.8, 0), (58, 0), (39.1, 18)))

    # Hero wordmark - the real prepared EVLV artwork, never retyped.
    logo_w = 34.0 * PT
    logo_h = logo_w / 3
    c.drawImage(str(LOGO), (W - logo_w) / 2, 20.1 * PT, width=logo_w, height=logo_h, preserveAspectRatio=True, mask="auto")

    # The slogan is the secondary hero, split into two levels for unmistakable
    # distance hierarchy instead of surrounding it with generic rules.
    c.setFillColor(WHITE)
    draw_tracked_centered(c, 14.25 * PT, "BECOME", "EVLV-Light", 72, 18)
    draw_tracked_centered(c, 9.9 * PT, "YOUR ULTIMATE", "EVLV-Medium", 150, 10)

    # Quiet, highly legible destination below the statement.
    c.setFillColor(WHITE)
    draw_tracked_centered(c, 4.55 * PT, "EVLVPEPTIDES.COM", "EVLV-Medium", 70, 8)

    c.setFillColor(WHITE)
    draw_tracked_centered(
        c,
        1.35 * PT,
        "FOR RESEARCH USE ONLY. NOT FOR HUMAN OR VETERINARY USE.",
        "EVLV-Medium",
        15,
        3.5,
    )

    c.showPage()
    c.save()
    print(PDF)


if __name__ == "__main__":
    create()
