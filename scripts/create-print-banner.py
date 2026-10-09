from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "banner"
TMP = ROOT / "tmp" / "banner"
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)

BACKGROUND = TMP / "evlv-banner-background.png"
LOGO = ROOT / "public" / "logo" / "evlv-logo-light.png"
PDF = OUT / "evlv-outdoor-banner-5x3ft-print.pdf"
PRINT_PNG = OUT / "evlv-outdoor-banner-5x3ft-125dpi.png"
PREVIEW = OUT / "evlv-outdoor-banner-preview.png"
PRINT_BACKGROUND = TMP / "evlv-banner-print-background.png"

PAGE_W_IN, PAGE_H_IN = 60, 36
POINTS = 72
PAGE_W, PAGE_H = PAGE_W_IN * POINTS, PAGE_H_IN * POINTS

OBSIDIAN = "#0E1113"
DEEP_MINERAL = "#203A37"
SOFT_IVORY = "#E7E3DA"
PORCELAIN = "#F1EEE7"
MUTED_SAGE = "#7D948E"


def cover_crop(image: Image.Image, width: int, height: int) -> Image.Image:
    scale = max(width / image.width, height / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - width) // 2
    top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def prepare_background() -> None:
    source = Image.open(BACKGROUND).convert("RGB")
    background = cover_crop(source, 7500, 4500)
    background = ImageEnhance.Contrast(background).enhance(1.06)
    background = background.filter(ImageFilter.UnsharpMask(radius=1.3, percent=80, threshold=3))

    # A controlled left-side density veil makes the exact vector typography
    # readable in sun without flattening the product photography on the right.
    alpha_row = Image.new("L", (background.width, 1))
    alpha_row.putdata([
        int(172 * max(0.0, min(1.0, (0.64 - (x / background.width)) / 0.46)))
        for x in range(background.width)
    ])
    alpha = alpha_row.resize(background.size)
    veil = Image.new("RGBA", background.size, (14, 17, 19, 0))
    veil.putalpha(alpha)
    background = Image.alpha_composite(background.convert("RGBA"), veil).convert("RGB")
    background.save(PRINT_BACKGROUND, quality=95, dpi=(125, 125))
    background.resize((3000, 1800), Image.Resampling.LANCZOS).save(TMP / "background-preview.png", quality=94)


def draw_qr(c: canvas.Canvas, x: float, y: float, size: float) -> None:
    code = QrCodeWidget("https://evlvpeptides.com")
    bounds = code.getBounds()
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    drawing = Drawing(size, size, transform=[size / width, 0, 0, size / height, 0, 0])
    drawing.add(code)
    c.setFillColor(HexColor(PORCELAIN))
    c.roundRect(x, y, size, size, 12, fill=1, stroke=0)
    renderPDF.draw(drawing, c, x, y)


def draw_tracked(c: canvas.Canvas, x: float, y: float, text: str, font: str, size: float, tracking: float) -> None:
    line = c.beginText(x, y)
    line.setFont(font, size)
    line.setCharSpace(tracking)
    line.textOut(text)
    c.drawText(line)


def draw_pdf() -> None:
    regular = r"C:\Windows\Fonts\arial.ttf"
    bold = r"C:\Windows\Fonts\arialbd.ttf"
    pdfmetrics.registerFont(TTFont("EVLV-Regular", regular))
    pdfmetrics.registerFont(TTFont("EVLV-Bold", bold))

    c = canvas.Canvas(str(PDF), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("EVLV Outdoor Banner - 5 x 3 ft")
    c.setAuthor("EVLV")
    c.drawImage(str(PRINT_BACKGROUND), 0, 0, width=PAGE_W, height=PAGE_H, preserveAspectRatio=True, mask="auto")

    # Logo and top descriptor.
    c.drawImage(str(LOGO), 3.25 * POINTS, 26.4 * POINTS, width=24.0 * POINTS, height=8.0 * POINTS, preserveAspectRatio=True, mask="auto")
    c.setFillColor(HexColor(MUTED_SAGE))
    draw_tracked(c, 3.45 * POINTS, 25.5 * POINTS, "PREMIUM RESEARCH PEPTIDES", "EVLV-Bold", 42, 8)

    # Long-distance headline.
    c.setFillColor(HexColor(SOFT_IVORY))
    c.setFont("EVLV-Bold", 142)
    c.drawString(3.2 * POINTS, 20.5 * POINTS, "SCIENCE.")
    c.drawString(3.2 * POINTS, 17.65 * POINTS, "PURITY.")
    c.drawString(3.2 * POINTS, 14.8 * POINTS, "PERFORMANCE.")

    # Proof strip.
    c.setStrokeColor(HexColor(MUTED_SAGE))
    c.setLineWidth(6)
    c.line(3.25 * POINTS, 12.65 * POINTS, 31.8 * POINTS, 12.65 * POINTS)
    c.setFillColor(HexColor(PORCELAIN))
    draw_tracked(c, 3.3 * POINTS, 11.55 * POINTS, "99%+ PURITY  /  THIRD-PARTY TESTED  /  BATCH-LEVEL COAs", "EVLV-Bold", 34, 2.5)

    # Action area and exact QR code.
    draw_qr(c, 3.25 * POINTS, 3.1 * POINTS, 5.2 * POINTS)
    c.setFillColor(HexColor(SOFT_IVORY))
    c.setFont("EVLV-Bold", 72)
    c.drawString(9.25 * POINTS, 6.35 * POINTS, "EVLVPEPTIDES.COM")
    c.setFillColor(HexColor(MUTED_SAGE))
    draw_tracked(c, 9.35 * POINTS, 4.9 * POINTS, "SCAN TO VIEW THE CURRENT RESEARCH CATALOG", "EVLV-Bold", 26, 2)

    c.setFillColor(HexColor(SOFT_IVORY))
    c.setFillAlpha(0.68)
    c.setFont("EVLV-Bold", 22)
    c.drawString(3.3 * POINTS, 1.35 * POINTS, "FOR RESEARCH USE ONLY. NOT FOR HUMAN OR VETERINARY USE.")
    c.setFillAlpha(1)

    c.showPage()
    c.save()


def make_preview() -> None:
    # Rasterize the same precise layout for a quick, portable visual preview.
    # Poppler will overwrite this with the authoritative PDF render during QA.
    pass


if __name__ == "__main__":
    prepare_background()
    draw_pdf()
    print(PDF)
    print(PRINT_PNG)
