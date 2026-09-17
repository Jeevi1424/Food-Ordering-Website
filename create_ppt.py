from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt
import copy

prs = Presentation()
prs.slide_width  = Inches(13.33)
prs.slide_height = Inches(7.5)

# ── Color Palette ──
C_BG       = RGBColor(0xFF, 0xFF, 0xFF)   # white
C_PRIMARY  = RGBColor(0xFF, 0x61, 0x00)   # orange  #FF6100
C_DARK     = RGBColor(0x1A, 0x1A, 0x2E)   # dark navy
C_ACCENT   = RGBColor(0xFF, 0xC1, 0x07)   # yellow
C_LIGHT    = RGBColor(0xF8, 0xF9, 0xFA)   # light grey
C_WHITE    = RGBColor(0xFF, 0xFF, 0xFF)
C_TEXT     = RGBColor(0x33, 0x33, 0x33)
C_SUB      = RGBColor(0x66, 0x66, 0x66)
C_GREEN    = RGBColor(0x28, 0xA7, 0x45)
C_BLUE     = RGBColor(0x00, 0x7B, 0xFF)

blank_layout = prs.slide_layouts[6]  # completely blank

# ════════════════════════════════════════════════════
# Helper utilities
# ════════════════════════════════════════════════════

def add_rect(slide, l, t, w, h, fill_color=None, line_color=None, line_width=None):
    from pptx.util import Pt
    shape = slide.shapes.add_shape(1, Inches(l), Inches(t), Inches(w), Inches(h))
    shape.line.fill.background()
    if fill_color:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_color
    else:
        shape.fill.background()
    if line_color:
        shape.line.color.rgb = line_color
        if line_width:
            shape.line.width = Pt(line_width)
    else:
        shape.line.fill.background()
    return shape

def add_text(slide, text, l, t, w, h,
             font_size=18, bold=False, color=C_TEXT,
             align=PP_ALIGN.LEFT, italic=False, wrap=True):
    txBox = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = txBox.text_frame
    tf.word_wrap = wrap
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    return txBox

def add_multiline(slide, lines, l, t, w, h,
                  font_size=16, bold=False, color=C_TEXT,
                  align=PP_ALIGN.LEFT, line_spacing=None):
    """lines: list of (text, bold, size, color) tuples OR plain strings"""
    txBox = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = txBox.text_frame
    tf.word_wrap = True
    first = True
    for item in lines:
        if isinstance(item, str):
            txt, b, sz, col = item, bold, font_size, color
        else:
            txt, b, sz, col = item
        if first:
            p = tf.paragraphs[0]
            first = False
        else:
            p = tf.add_paragraph()
        p.alignment = align
        if line_spacing:
            p.line_spacing = line_spacing
        run = p.add_run()
        run.text = txt
        run.font.size = Pt(sz)
        run.font.bold = b
        run.font.color.rgb = col

def slide_bg(slide, color=C_WHITE):
    add_rect(slide, 0, 0, 13.33, 7.5, fill_color=color)

def top_bar(slide, color=C_PRIMARY, height=1.1):
    add_rect(slide, 0, 0, 13.33, height, fill_color=color)

def bottom_bar(slide, color=C_PRIMARY, height=0.35):
    add_rect(slide, 0, 7.15, 13.33, height, fill_color=color)

def section_badge(slide, text, l, t, color=C_PRIMARY):
    add_rect(slide, l, t, 2.6, 0.38, fill_color=color)
    add_text(slide, text, l+0.1, t+0.04, 2.4, 0.3,
             font_size=11, bold=True, color=C_WHITE, align=PP_ALIGN.CENTER)

def slide_number(slide, num):
    add_text(slide, str(num), 12.8, 7.15, 0.4, 0.3,
             font_size=10, color=C_WHITE, align=PP_ALIGN.CENTER)

def divider(slide, l, t, w, color=C_PRIMARY, thickness=0.04):
    add_rect(slide, l, t, w, thickness, fill_color=color)


# ════════════════════════════════════════════════════
# SLIDE 1 — Title
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s, C_DARK)

# big orange left panel
add_rect(s, 0, 0, 5.5, 7.5, fill_color=C_PRIMARY)

# food emoji background bubbles (decorative rects)
for i, (ex, ey, ew) in enumerate([(0.3,0.3,0.8),(1.5,0.5,0.6),(3.0,0.2,0.7),
                                    (0.6,5.8,0.7),(2.2,6.0,0.5),(4.0,5.6,0.8)]):
    r = add_rect(s, ex, ey, ew, ew, fill_color=RGBColor(0xFF,0x80,0x30))
    r.fill.fore_color.rgb = RGBColor(0xFF, 0x80, 0x30)

add_text(s, "🍕🍔🍣", 0.4, 0.25, 4.6, 0.8, font_size=32, align=PP_ALIGN.CENTER, color=C_WHITE)
add_text(s, "🍛🌮🍰", 0.4, 6.3, 4.6, 0.8, font_size=32, align=PP_ALIGN.CENTER, color=C_WHITE)

add_text(s, "FoodRush", 0.3, 1.4, 4.9, 1.4,
         font_size=58, bold=True, color=C_WHITE, align=PP_ALIGN.CENTER)
add_text(s, "Online Food Ordering", 0.3, 2.9, 4.9, 0.6,
         font_size=22, bold=False, color=C_ACCENT, align=PP_ALIGN.CENTER)
add_text(s, "Web Application", 0.3, 3.45, 4.9, 0.6,
         font_size=22, bold=False, color=C_ACCENT, align=PP_ALIGN.CENTER)

divider(s, 0.5, 4.15, 4.3, color=C_WHITE)

add_text(s, "Full-Stack Front-End Project", 0.3, 4.3, 4.9, 0.5,
         font_size=14, italic=True, color=C_WHITE, align=PP_ALIGN.CENTER)

# right side
add_text(s, "Project Presentation", 5.8, 1.6, 7.0, 0.7,
         font_size=28, bold=True, color=C_WHITE, align=PP_ALIGN.LEFT)
divider(s, 5.8, 2.4, 6.5, color=C_PRIMARY)

details = [
    ("👤  Developed by  :  Jeevitha", False, 16, C_WHITE),
    ("", False, 10, C_WHITE),
    ("💻  Tech Stack     :  HTML • CSS • JavaScript", False, 16, C_WHITE),
    ("", False, 10, C_WHITE),
    ("🚀  Deployed on  :  GitHub Pages", False, 16, C_WHITE),
    ("", False, 10, C_WHITE),
    ("🌐  Live URL  :  Jeevi1424.github.io/Food-Ordering-Website", False, 14, C_ACCENT),
]
add_multiline(s, details, 5.8, 2.6, 7.0, 3.0, line_spacing=1.3)
slide_number(s, 1)


# ════════════════════════════════════════════════════
# SLIDE 2 — Project Overview
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s)
top_bar(s)
bottom_bar(s)

add_text(s, "Project Overview", 0.4, 0.2, 9, 0.7,
         font_size=32, bold=True, color=C_WHITE)
add_text(s, "What is FoodRush?", 0.4, 0.85, 9, 0.45,
         font_size=16, italic=True, color=C_ACCENT)

# 3 info cards
cards = [
    ("🎯", "Purpose", "A food delivery platform simulation inspired by Swiggy & Zomato", C_PRIMARY),
    ("👥", "Users", "3 Roles — Customer, Restaurant Owner & Admin, each with their own dashboard", C_DARK),
    ("🛠", "Built With", "Pure HTML5, CSS3 & Vanilla JavaScript — zero frameworks, zero libraries", C_BLUE),
]
for i, (icon, title, desc, col) in enumerate(cards):
    x = 0.4 + i * 4.3
    add_rect(s, x, 1.55, 3.9, 2.3, fill_color=col)
    add_text(s, icon, x+0.2, 1.65, 0.7, 0.7, font_size=28, color=C_WHITE)
    add_text(s, title, x+0.95, 1.7, 2.8, 0.5, font_size=18, bold=True, color=C_WHITE)
    add_text(s, desc, x+0.2, 2.25, 3.5, 1.4, font_size=13, color=C_WHITE)

# bullet points
bullets = [
    "✅  Browse 8 restaurants across 8 cuisines with full menu listings",
    "✅  Complete order flow: Browse → Cart → Checkout → Payment → Tracking",
    "✅  Persistent data using localStorage — cart & orders survive page navigation",
    "✅  Deployed live on GitHub Pages — accessible from anywhere in the world",
]
for i, b in enumerate(bullets):
    add_text(s, b, 0.5, 4.1 + i*0.52, 12.3, 0.48, font_size=15, color=C_TEXT)

slide_number(s, 2)


# ════════════════════════════════════════════════════
# SLIDE 3 — Tech Stack
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s)
top_bar(s)
bottom_bar(s)

add_text(s, "Tech Stack", 0.4, 0.2, 9, 0.7, font_size=32, bold=True, color=C_WHITE)
add_text(s, "Technologies Used", 0.4, 0.85, 9, 0.45, font_size=16, italic=True, color=C_ACCENT)

tech = [
    ("HTML5",        "Page structure, semantic elements, forms & navigation", "🌐", C_PRIMARY),
    ("CSS3",         "Styling, animations, flexbox/grid, responsive design",   "🎨", RGBColor(0x26,0x4D,0xE4)),
    ("JavaScript",   "DOM manipulation, logic, event handling, localStorage",  "⚡", RGBColor(0xF7,0xDF,0x1E)),
    ("localStorage", "Client-side data persistence — cart, orders, sessions",  "💾", C_GREEN),
    ("Font Awesome", "Icon library used throughout the entire UI",             "✨", RGBColor(0x53,0x8D,0xD4)),
    ("GitHub Pages", "Free static site hosting — live deployment",             "🚀", C_DARK),
]

cols = 3
for i, (name, desc, icon, col) in enumerate(tech):
    row = i // cols
    col_i = i % cols
    x = 0.4 + col_i * 4.3
    y = 1.55 + row * 2.4
    add_rect(s, x, y, 3.9, 2.1, fill_color=C_LIGHT)
    add_rect(s, x, y, 3.9, 0.55, fill_color=col)
    add_text(s, icon + "  " + name, x+0.15, y+0.08, 3.6, 0.45,
             font_size=17, bold=True, color=C_WHITE)
    add_text(s, desc, x+0.15, y+0.65, 3.6, 1.3, font_size=13, color=C_TEXT)

slide_number(s, 3)


# ════════════════════════════════════════════════════
# SLIDE 4 — Project Structure
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s)
top_bar(s)
bottom_bar(s)

add_text(s, "Project Structure", 0.4, 0.2, 9, 0.7, font_size=32, bold=True, color=C_WHITE)
add_text(s, "Pages & Files", 0.4, 0.85, 9, 0.45, font_size=16, italic=True, color=C_ACCENT)

pages = [
    ("🏠", "index.html",               "Home page — hero, search, featured restaurants, categories"),
    ("🍽",  "restaurants.html",         "Browse all restaurants with filters and sorting"),
    ("📋", "menu.html",                "Restaurant menu, add to cart, customer reviews"),
    ("💳", "checkout.html",            "Delivery details, payment, promo codes, order summary"),
    ("✅", "order-confirmation.html",  "Order success, live 4-step tracking animation"),
    ("🔑", "login.html",               "Login & Register with role-based redirect"),
    ("📊", "owner-dashboard.html",     "Restaurant owner — orders, menu management, settings"),
    ("🛡",  "admin.html",               "Admin panel — platform analytics, approvals, user mgmt"),
]

for i, (icon, file, desc) in enumerate(pages):
    row = i % 4
    col_i = i // 4
    x = 0.4 + col_i * 6.5
    y = 1.55 + row * 1.32
    bg = C_LIGHT if i % 2 == 0 else C_WHITE
    add_rect(s, x, y, 6.1, 1.15, fill_color=bg, line_color=RGBColor(0xDD,0xDD,0xDD), line_width=0.5)
    add_rect(s, x, y, 0.6, 1.15, fill_color=C_PRIMARY)
    add_text(s, icon, x+0.08, y+0.28, 0.5, 0.55, font_size=20, color=C_WHITE, align=PP_ALIGN.CENTER)
    add_text(s, file, x+0.7, y+0.1, 5.2, 0.4, font_size=14, bold=True, color=C_DARK)
    add_text(s, desc, x+0.7, y+0.52, 5.2, 0.55, font_size=12, color=C_SUB)

slide_number(s, 4)


# ════════════════════════════════════════════════════
# SLIDE 5 — Customer Features
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s)
top_bar(s)
bottom_bar(s)

add_text(s, "Customer Features", 0.4, 0.2, 9, 0.7, font_size=32, bold=True, color=C_WHITE)
add_text(s, "What a customer can do on FoodRush", 0.4, 0.85, 9, 0.45, font_size=16, italic=True, color=C_ACCENT)

features = [
    ("🔍 Search & Filter",     "Search restaurants by name, cuisine, location\nFilter by rating • Sort by price, delivery time"),
    ("🛒 Smart Cart",           "Add items, adjust qty, cart persists across pages\nMulti-restaurant conflict alert built in"),
    ("🏷 Promo Codes",          "3 working codes: FIRST10 (10% off)\nSAVE5 ($5 off $25+)  •  RUSH20 (20% off)"),
    ("💳 Payment Options",      "Stripe-style card form with auto-formatting\nCash on Delivery option available"),
    ("📍 Order Tracking",       "4-step live tracker: Placed → Preparing\n→ Out for Delivery → Delivered"),
    ("⭐ Reviews",              "Submit star ratings & text reviews\nRating bars & average shown per restaurant"),
]

for i, (title, desc) in enumerate(features):
    row = i % 3
    col_i = i // 3
    x = 0.4 + col_i * 6.5
    y = 1.55 + row * 1.8
    add_rect(s, x, y, 6.1, 1.65, fill_color=C_LIGHT)
    add_rect(s, x, y, 0.07, 1.65, fill_color=C_PRIMARY)
    add_text(s, title, x+0.25, y+0.15, 5.7, 0.45, font_size=15, bold=True, color=C_PRIMARY)
    add_text(s, desc,  x+0.25, y+0.6,  5.7, 0.95, font_size=13, color=C_TEXT)

slide_number(s, 5)


# ════════════════════════════════════════════════════
# SLIDE 6 — Owner & Admin Features
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s)
top_bar(s)
bottom_bar(s)

add_text(s, "Owner & Admin Features", 0.4, 0.2, 10, 0.7, font_size=32, bold=True, color=C_WHITE)
add_text(s, "Dashboards for business management", 0.4, 0.85, 9, 0.45, font_size=16, italic=True, color=C_ACCENT)

# Owner column
add_rect(s, 0.4, 1.5, 5.9, 5.4, fill_color=C_LIGHT)
add_rect(s, 0.4, 1.5, 5.9, 0.55, fill_color=C_DARK)
add_text(s, "🏪  Restaurant Owner Dashboard", 0.55, 1.55, 5.6, 0.45, font_size=16, bold=True, color=C_WHITE)

owner_items = [
    "📊  View total orders, revenue, avg rating & pending count",
    "📋  Full menu management — Add, Edit, Delete items via modal",
    "🔄  Update order status in real-time (Preparing → Delivered)",
    "⭐  View all customer reviews for the restaurant",
    "⚙️   Edit restaurant name, cuisine, delivery time & status",
    "📈  Top-selling items bar chart with order counts",
]
for i, item in enumerate(owner_items):
    add_text(s, item, 0.55, 2.2 + i*0.68, 5.6, 0.6, font_size=13, color=C_TEXT)

# Admin column
add_rect(s, 6.9, 1.5, 6.0, 5.4, fill_color=C_LIGHT)
add_rect(s, 6.9, 1.5, 6.0, 0.55, fill_color=C_PRIMARY)
add_text(s, "🛡  Admin Panel", 7.05, 1.55, 5.7, 0.45, font_size=16, bold=True, color=C_WHITE)

admin_items = [
    "📊  Platform-wide stats — restaurants, users, orders, revenue",
    "✅  Approve or reject new restaurant registrations",
    "👥  Manage all users — search, view roles, remove users",
    "📦  Monitor all orders across the entire platform",
    "⭐  Moderate & remove reviews from all restaurants",
    "🔍  Filter restaurants by approved / pending / suspended",
]
for i, item in enumerate(admin_items):
    add_text(s, item, 7.05, 2.2 + i*0.68, 5.7, 0.6, font_size=13, color=C_TEXT)

slide_number(s, 6)


# ════════════════════════════════════════════════════
# SLIDE 7 — User Flow
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s)
top_bar(s)
bottom_bar(s)

add_text(s, "User Journey", 0.4, 0.2, 9, 0.7, font_size=32, bold=True, color=C_WHITE)
add_text(s, "How a customer places an order — step by step", 0.4, 0.85, 9, 0.45, font_size=16, italic=True, color=C_ACCENT)

steps = [
    ("1", "🏠", "Home Page",       "Search by cuisine\nor location"),
    ("2", "🍽", "Restaurants",     "Browse, filter\nand sort"),
    ("3", "📋", "Menu",            "View items &\nadd to cart"),
    ("4", "🛒", "Cart",            "Review items\n& total"),
    ("5", "💳", "Checkout",        "Delivery info\n& payment"),
    ("6", "✅", "Confirmation",    "Order placed\n& tracked"),
]

box_w = 1.8
start_x = 0.55
y_box = 2.0

for i, (num, icon, title, desc) in enumerate(steps):
    x = start_x + i * 2.05
    # circle
    add_rect(s, x+0.55, y_box, 0.7, 0.7, fill_color=C_PRIMARY)
    add_text(s, num, x+0.55, y_box+0.1, 0.7, 0.5, font_size=18, bold=True, color=C_WHITE, align=PP_ALIGN.CENTER)
    # box
    add_rect(s, x, y_box+0.85, box_w, 2.3, fill_color=C_LIGHT, line_color=RGBColor(0xDD,0xDD,0xDD), line_width=0.5)
    add_text(s, icon, x+0.55, y_box+0.95, 0.7, 0.6, font_size=26, align=PP_ALIGN.CENTER)
    add_text(s, title, x+0.05, y_box+1.6, box_w-0.1, 0.45, font_size=14, bold=True, color=C_DARK, align=PP_ALIGN.CENTER)
    add_text(s, desc, x+0.05, y_box+2.1, box_w-0.1, 0.9, font_size=12, color=C_SUB, align=PP_ALIGN.CENTER)

    # arrow
    if i < len(steps) - 1:
        add_text(s, "→", x+box_w+0.05, y_box+1.7, 0.4, 0.4, font_size=22, bold=True, color=C_PRIMARY, align=PP_ALIGN.CENTER)

# note
add_rect(s, 0.5, 5.55, 12.3, 0.55, fill_color=RGBColor(0xFF,0xF3,0xCD))
add_text(s, "💡  Cart is stored in localStorage — persists across all pages. Order data saved after checkout for confirmation page.",
         0.65, 5.6, 12.0, 0.45, font_size=13, color=RGBColor(0x85,0x60,0x04))

slide_number(s, 7)


# ════════════════════════════════════════════════════
# SLIDE 8 — Data Architecture
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s)
top_bar(s)
bottom_bar(s)

add_text(s, "Data Architecture", 0.4, 0.2, 9, 0.7, font_size=32, bold=True, color=C_WHITE)
add_text(s, "How data is managed without a backend", 0.4, 0.85, 9, 0.45, font_size=16, italic=True, color=C_ACCENT)

# data.js box
add_rect(s, 0.4, 1.5, 5.9, 5.4, fill_color=C_LIGHT)
add_rect(s, 0.4, 1.5, 5.9, 0.55, fill_color=C_DARK)
add_text(s, "📁  data.js  —  Central Data Layer", 0.55, 1.55, 5.6, 0.45, font_size=16, bold=True, color=C_WHITE)

data_items = [
    ("8 Restaurants", "Full details — name, cuisine, rating, location, delivery time"),
    ("Menu Items",    "Categories + items with price, tags, emoji, description"),
    ("4 Mock Users",  "Customer, Owner, Admin, Restaurant Owner roles"),
    ("5 Mock Orders", "Pre-loaded order history for dashboard demos"),
    ("Promo Codes",   "FIRST10 (10%) • SAVE5 ($5 off) • RUSH20 (20%)"),
]
for i, (key, val) in enumerate(data_items):
    y = 2.2 + i * 0.85
    add_rect(s, 0.55, y, 5.6, 0.72, fill_color=C_WHITE, line_color=RGBColor(0xDD,0xDD,0xDD), line_width=0.5)
    add_text(s, key, 0.7, y+0.07, 1.8, 0.3, font_size=13, bold=True, color=C_PRIMARY)
    add_text(s, val, 0.7, y+0.37, 5.2, 0.3, font_size=12, color=C_SUB)

# localStorage box
add_rect(s, 6.9, 1.5, 6.0, 5.4, fill_color=C_LIGHT)
add_rect(s, 6.9, 1.5, 6.0, 0.55, fill_color=C_PRIMARY)
add_text(s, "💾  localStorage  —  Persistence Layer", 7.05, 1.55, 5.7, 0.45, font_size=16, bold=True, color=C_WHITE)

ls_items = [
    ("currentUser",     "Logged-in user object (name, email, role)"),
    ("cart",            "Cart items, restaurant ID & name"),
    ("orders",          "All placed orders history array"),
    ("lastOrder",       "Most recent order for confirmation page"),
    ("reviews_{id}",    "User-submitted reviews per restaurant"),
    ("menu_{id}",       "Owner-edited menu items per restaurant"),
]
for i, (key, val) in enumerate(ls_items):
    y = 2.2 + i * 0.72
    add_rect(s, 7.05, y, 5.7, 0.62, fill_color=C_WHITE, line_color=RGBColor(0xDD,0xDD,0xDD), line_width=0.5)
    add_text(s, key, 7.18, y+0.07, 2.2, 0.28, font_size=12, bold=True, color=C_DARK)
    add_text(s, val,  7.18, y+0.33, 5.4, 0.26, font_size=11, color=C_SUB)

slide_number(s, 8)


# ════════════════════════════════════════════════════
# SLIDE 9 — Deployment
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s)
top_bar(s)
bottom_bar(s)

add_text(s, "Deployment", 0.4, 0.2, 9, 0.7, font_size=32, bold=True, color=C_WHITE)
add_text(s, "Hosted live on GitHub Pages", 0.4, 0.85, 9, 0.45, font_size=16, italic=True, color=C_ACCENT)

# Steps
steps_deploy = [
    ("1", "git init",                              "Initialized a new Git repository in the project folder"),
    ("2", "git add .",                             "Staged all HTML, CSS, JS and asset files"),
    ("3", 'git commit -m "Initial commit"',        "Created the first commit with all project files"),
    ("4", "git branch -M main",                    "Renamed the default branch to main"),
    ("5", "git remote add origin <GitHub URL>",    "Linked local repo to GitHub repository"),
    ("6", "git push -u origin main",               "Pushed all code to GitHub remote repository"),
    ("7", "Settings → Pages → Branch: main",       "Enabled GitHub Pages from the repository settings"),
]

for i, (num, cmd, desc) in enumerate(steps_deploy):
    y = 1.5 + i * 0.72
    add_rect(s, 0.4, y, 0.5, 0.6, fill_color=C_PRIMARY)
    add_text(s, num, 0.4, y+0.1, 0.5, 0.4, font_size=14, bold=True, color=C_WHITE, align=PP_ALIGN.CENTER)
    add_rect(s, 0.95, y, 4.5, 0.6, fill_color=C_DARK)
    add_text(s, cmd, 1.05, y+0.1, 4.3, 0.42, font_size=13, bold=True, color=C_ACCENT)
    add_text(s, desc, 5.6, y+0.1, 7.1, 0.42, font_size=13, color=C_TEXT)

# Live URL box
add_rect(s, 0.4, 6.6, 12.5, 0.55, fill_color=C_PRIMARY)
add_text(s, "🌐  Live URL:  https://Jeevi1424.github.io/Food-Ordering-Website",
         0.6, 6.63, 12.1, 0.45, font_size=15, bold=True, color=C_WHITE, align=PP_ALIGN.CENTER)

slide_number(s, 9)


# ════════════════════════════════════════════════════
# SLIDE 10 — Conclusion & Future Scope
# ════════════════════════════════════════════════════
s = prs.slides.add_slide(blank_layout)
slide_bg(s, C_DARK)

# orange strip at top
add_rect(s, 0, 0, 13.33, 1.1, fill_color=C_PRIMARY)
add_text(s, "Conclusion & Future Scope", 0.4, 0.2, 10, 0.7, font_size=32, bold=True, color=C_WHITE)
add_text(s, "What was achieved & where to go next", 0.4, 0.82, 9, 0.35, font_size=15, italic=True, color=C_ACCENT)

# Achievements
add_rect(s, 0.4, 1.35, 6.1, 4.8, fill_color=RGBColor(0x22,0x22,0x3A))
add_rect(s, 0.4, 1.35, 6.1, 0.55, fill_color=C_GREEN)
add_text(s, "✅  What Was Achieved", 0.55, 1.38, 5.8, 0.48, font_size=16, bold=True, color=C_WHITE)

achievements = [
    "8 fully functional pages with smooth navigation",
    "3 user roles — Customer, Owner, Admin",
    "Complete order flow: Browse → Pay → Track",
    "Working cart, promo codes & payment simulation",
    "Owner dashboard with live menu CRUD operations",
    "Admin panel with platform-wide analytics",
    "Deployed live — accessible from anywhere",
]
for i, a in enumerate(achievements):
    add_text(s, "  •  " + a, 0.55, 2.05 + i*0.53, 5.8, 0.48, font_size=13, color=C_WHITE)

# Future scope
add_rect(s, 6.85, 1.35, 6.1, 4.8, fill_color=RGBColor(0x22,0x22,0x3A))
add_rect(s, 6.85, 1.35, 6.1, 0.55, fill_color=C_BLUE)
add_text(s, "🚀  Future Enhancements", 7.0, 1.38, 5.8, 0.48, font_size=16, bold=True, color=C_WHITE)

future = [
    "Node.js + Express backend with REST API",
    "MongoDB / PostgreSQL real database",
    "Real Stripe payment gateway integration",
    "WebSocket real-time order tracking",
    "Email / SMS notifications on order updates",
    "React Native mobile application",
    "AI-based food recommendation engine",
]
for i, f in enumerate(future):
    add_text(s, "  →  " + f, 7.0, 2.05 + i*0.53, 5.8, 0.48, font_size=13, color=C_WHITE)

# bottom quote
add_rect(s, 0.4, 6.3, 12.5, 0.65, fill_color=C_PRIMARY)
add_text(s,
    '"FoodRush demonstrates real-world front-end skills: UI design, state management, multi-role auth & live deployment."',
    0.6, 6.33, 12.1, 0.55, font_size=13, italic=True, color=C_WHITE, align=PP_ALIGN.CENTER)

slide_number(s, 10)


# ════════════════════════════════════════════════════
# Save
# ════════════════════════════════════════════════════
output = r"c:\Users\jeevi\OneDrive\Desktop\Food App\FoodRush_Presentation.pptx"
prs.save(output)
print("PPT saved:", output)
