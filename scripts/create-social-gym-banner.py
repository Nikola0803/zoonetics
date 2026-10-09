from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "banner"
OUT.mkdir(parents=True, exist_ok=True)

PDF = OUT / "evlv-social-gym-banner-5x3ft-print.pdf"
BACKGROUND = ROOT / "public" / "images" / "banner" / "evlv-black-luxe-bg-v1.png"
LOGO = ROOT / "public" / "logo" / "evlv-logo-light.png"

PT = 72
W, H = 60 * PT, 36 * PT
WHITE = HexColor("#FFFFFF")


def tracked_width(text: str, font: str, size: float, tracking: float) -> float:
    return pdfmetrics.stringWidth(text, font, size) + max(0, len(text) - 1) * tracking


def draw_tracked(c: canvas.Canvas, x: float, y: float, text: str, font: str, size: float, tracking: float) -> None:
    line = c.beginText(x, y)
    line.setFont(font, size)
    line.setCharSpace(tracking)
    line.textOut(text)
    c.drawText(line)


def draw_tracked_centered(c: canvas.Canvas, y: float, text: str, font: str, size: float, tracking: float) -> None:
    width = tracked_width(text, font, size, tracking)
    draw_tracked(c, (W - width) / 2, y, text, font, size, tracking)


def draw_instagram_icon(c: canvas.Canvas, x: float, center_y: float, size: float) -> None:
    bottom = center_y - size / 2
    c.setStrokeColor(WHITE)
    c.setLineWidth(3.2)
    c.roundRect(x, bottom, size, size, size * 0.24, fill=0, stroke=1)
    c.circle(x + size / 2, center_y, size * 0.22, fill=0, stroke=1)
    c.setFillColor(WHITE)
    c.circle(x + size * 0.74, bottom + size * 0.75, size * 0.055, fill=1, stroke=0)


def draw_globe_icon(c: canvas.Canvas, x: float, center_y: float, size: float) -> None:
    center_x = x + size / 2
    radius = size / 2
    c.setStrokeColor(WHITE)
    c.setLineWidth(2.6)
    c.circle(center_x, center_y, radius, fill=0, stroke=1)
    c.ellipse(center_x - radius * 0.45, center_y - radius, center_x + radius * 0.45, center_y + radius, fill=0, stroke=1)
    c.line(center_x - radius, center_y, center_x + radius, center_y)


def create() -> None:
    pdfmetrics.registerFont(TTFont("EVLV-Light", r"C:\Windows\Fonts\Poppins-Light.ttf"))
    pdfmetrics.registerFont(TTFont("EVLV-Medium", r"C:\Windows\Fonts\Poppins-Medium.ttf"))

    c = canvas.Canvas(str(PDF), pagesize=(W, H), pageCompression=1)
    c.setTitle("EVLV Social Gym Banner - 5 x 3 ft")
    c.setAuthor("EVLV")

    # Generated texture is atmosphere only; all brand and social artwork below
    # remains exact, deterministic, and sharp in the PDF.
    c.drawImage(str(BACKGROUND), 0, 0, width=W, height=H, preserveAspectRatio=False, mask="auto")

    logo_w = 34.0 * PT
    logo_h = logo_w / 3
    c.drawImage(str(LOGO), (W - logo_w) / 2, 20.2 * PT, width=logo_w, height=logo_h, preserveAspectRatio=True, mask="auto")

    c.setFillColor(WHITE)
    draw_tracked_centered(c, 12.4 * PT, "BECOME YOUR ULTIMATE", "EVLV-Medium", 102, 7)

    # Website and Instagram are a single centered social lockup.
    url = "EVLVPEPTIDES.COM"
    handle = "@evlvtoday"
    social_font = "EVLV-Medium"
    social_size = 54
    social_tracking = 3.5
    icon_size = 0.82 * PT
    icon_gap = 0.4 * PT
    group_gap = 1.35 * PT
    url_w = tracked_width(url, social_font, social_size, social_tracking)
    handle_w = tracked_width(handle, social_font, social_size, social_tracking)
    total_w = icon_size + icon_gap + url_w + group_gap + icon_size + icon_gap + handle_w
    x = (W - total_w) / 2
    icon_center_y = 6.55 * PT
    text_y = 6.08 * PT

    draw_globe_icon(c, x, icon_center_y, icon_size)
    x += icon_size + icon_gap
    draw_tracked(c, x, text_y, url, social_font, social_size, social_tracking)
    x += url_w + group_gap
    draw_instagram_icon(c, x, icon_center_y, icon_size)
    x += icon_size + icon_gap
    draw_tracked(c, x, text_y, handle, social_font, social_size, social_tracking)

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
