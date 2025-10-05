# 🎥 AGRITRACE - Video Demo Script (5-10 minutes)

## 📋 Demo Checklist

Before recording:
- [ ] Backend running (http://localhost:8000)
- [ ] Frontend running (http://localhost:3001)
- [ ] Admin user created (username: renoir01)
- [ ] Test farmer user created
- [ ] Browser cache cleared
- [ ] Screen recording software ready
- [ ] Microphone tested
- [ ] Browser zoom at 100%

---

## 🎬 Script Breakdown

### INTRO (30 seconds) - 0:00-0:30

**[Show Landing Page]**

"Hello, I'm Renoir KAZE, and this is AGRITRACE - a blockchain-based traceability platform for biofortified crops in Rwanda.

AGRITRACE solves the problem of counterfeit biofortified products by providing transparent, immutable tracking from seed to consumer.

The system is built with React for the frontend, Django REST Framework for the backend, and is designed to work on both smartphones and feature phones through USSD.

Let me show you how it works."

---

### PART 1: USER REGISTRATION (1 minute) - 0:30-1:30

**[Navigate to Register Page]**

"First, let's register a new user. AGRITRACE supports 6 different user types:
- Farmers who grow the crops
- Traders who buy from farmers
- Processors who process the products
- Consumers who verify products
- Seed producers who create biofortified seeds
- And administrators who manage the system

Let me register as a Farmer."

**[Fill Registration Form]**
- Username: demo_farmer
- Email: farmer@demo.com
- Password: Demo@123
- User Type: **Farmer**
- Phone: +250 788 123 456
- First Name: Demo
- Last Name: Farmer

**[Click Register]**

"Notice the form validates all inputs and provides clear feedback. Once registered, users can login immediately."

---

### PART 2: ROLE-BASED NAVIGATION (1 minute) - 1:30-2:30

**[Login as Farmer]**

"After logging in as a Farmer, notice the navigation is customized for their role.

Farmers see:
- Dashboard with their farm statistics
- My Farm for farm management
- Register Product to record harvests
- My Products to view their inventory
- Transactions and Analytics

This role-based navigation ensures each user only sees features relevant to their work."

**[Show Navigation Menu]**

"The same applies to all user types. Let me quickly show you the admin view."

**[Logout and Login as Admin - renoir01]**

"As an administrator, I see different options:
- All Products from all users
- Users for user management
- System-wide analytics

This demonstrates our comprehensive role-based access control."

---

### PART 3: FARMER WORKFLOW (1.5 minutes) - 2:30-4:00

**[Login as Farmer]**

"Let's walk through a typical farmer workflow.

**Step 1: Farm Management**

**[Click My Farm]**

"First, farmers can manage their farm information - size, location, soil type, and irrigation system. This data helps track production patterns."

**[Show Farm Management Page]**

**Step 2: Register a Product**

**[Click Register Product]**

"When farmers harvest biofortified crops, they register them in the system."

**[Fill Product Form]**
- Product Name: Iron-Rich Beans
- Variety: Iron Bean
- Quantity: 100 kg
- Iron Content: 45 ppm
- Biofortified: Yes
- Harvest Date: Today

**[Click Register]**

"The system generates a unique QR code for this product. This QR code contains blockchain verification and can be printed on product labels.

Farmers can now sell this product to traders, and the entire supply chain will be tracked."

**[Show My Products]**

"Here farmers can see all their registered products, track sales, and monitor inventory."

---

### PART 4: TRADER WORKFLOW (1 minute) - 4:00-5:00

**[Switch to Trader View - or explain]**

"Now let's see how traders interact with the system.

**[Show Buy from Farmers Page]**

Traders use the 'Buy from Farmers' feature to purchase products. They scan the farmer's QR code to verify authenticity before purchasing.

**[Show Form]**
- QR Code: Scan or enter manually
- Quantity: How much they're buying
- Price: Purchase price per kg

This creates a blockchain transaction transferring ownership from farmer to trader.

**[Show Trader Inventory]**

Traders can then manage their inventory, track suppliers, and calculate profit margins before selling to processors."

---

### PART 5: QR CODE VERIFICATION (1.5 minutes) - 5:00-6:30

**[Navigate to Verify Page]**

"One of the most important features is product verification. Anyone can verify a product's authenticity by scanning its QR code.

**[Show Verify Page]**

The verification page offers two options:
1. Scan with camera - works on laptops, phones, and tablets
2. Enter manually - for when camera isn't available

**[Click 'Start Camera']**

"The scanner uses the device's camera to read QR codes. It works on all devices - laptops with webcams, smartphones, and tablets.

**[Show Manual Entry Option]**

For feature phones or when cameras aren't available, users can type the QR code manually.

**[Show Verification Results - Mock]**

When a product is verified, users see:
- Product details (name, variety, iron content)
- Complete supply chain history
- Blockchain verification status
- All previous owners and transactions

This transparency builds trust and prevents counterfeit products from entering the market."

---

### PART 6: CONSUMER FEATURES (1 minute) - 6:30-7:30

**[Show Consumer View]**

"Consumers have a simplified interface focused on verification.

**[Show Purchase History]**

They can:
- Track products they've verified
- View their purchase history
- Monitor their nutritional intake from biofortified products
- Leave product reviews

**[Show Stats]**

The system tracks how much iron and other nutrients they're consuming through biofortified products, helping them make informed dietary choices."

---

### PART 7: ADMIN FEATURES (1 minute) - 7:30-8:30

**[Login as Admin]**

"Administrators have the highest level of access for system management.

**[Show User Management]**

They can:
- View all users in the system
- Search and filter by role
- Create new users
- Monitor user activity

**[Show All Products]**

Admins see products from all users, not just their own, allowing them to monitor the entire supply chain.

**[Show Analytics Dashboard]**

The analytics dashboard provides:
- Total products registered
- Transaction volumes
- User activity
- System health metrics

This helps administrators ensure the platform is running smoothly and meeting its goals."

---

### PART 8: TECHNICAL HIGHLIGHTS (1 minute) - 8:30-9:30

**[Show Different Screens]**

"Let me highlight some technical features:

**Responsive Design:**
**[Resize browser window]**
The application works seamlessly on all screen sizes - desktop, tablet, and mobile.

**Progressive Web App:**
**[Show service worker in DevTools]**
AGRITRACE is a PWA, meaning it can work offline and be installed on devices like a native app.

**Role-Based Access:**
**[Show different user navigations]**
Each user type sees only the features they need, improving usability and security.

**Real-time Validation:**
**[Show form validation]**
All forms provide instant feedback, preventing errors before submission.

**QR Scanner:**
**[Show scanner]**
The camera-based QR scanner works on all devices with cameras, making verification accessible to everyone."

---

### CONCLUSION (30 seconds) - 9:30-10:00

**[Show Landing Page]**

"AGRITRACE demonstrates a complete full-stack solution with:
- 24 pages covering all user workflows
- 6 distinct user roles with custom features
- Blockchain-ready architecture
- Mobile-first responsive design
- Progressive Web App capabilities
- Comprehensive role-based access control

The system is ready for deployment and pilot testing in Musanze District.

Thank you for watching. For more information, visit the GitHub repository or contact me at r.kaze@alustudent.com"

**[End Screen with Contact Info]**

---

## 🎯 Key Points to Emphasize

1. **Problem-Solution Fit:** Addresses real authentication issues in Rwanda
2. **Role-Based System:** 6 user types with distinct features
3. **QR Verification:** Camera scanning on all devices
4. **Responsive Design:** Works on mobile, tablet, desktop
5. **Complete Workflow:** From registration to verification
6. **Professional UI:** Clean, modern, accessible
7. **Scalable Architecture:** Ready for production deployment
8. **Security:** Role-based access, JWT authentication

---

## 📸 Screenshots to Capture

1. Landing page (hero section)
2. Registration form
3. Login page
4. Farmer dashboard
5. Register product form
6. Product with QR code
7. Trader inventory
8. QR scanner (camera active)
9. Verification results
10. Consumer purchase history
11. Admin user management
12. Analytics dashboard
13. Mobile responsive views
14. Navigation menus for each role

---

## 🎤 Recording Tips

1. **Speak Clearly:** Moderate pace, clear pronunciation
2. **Show, Don't Tell:** Demonstrate features actively
3. **Smooth Transitions:** Plan navigation flow
4. **Highlight Key Features:** Emphasize unique aspects
5. **Professional Tone:** Confident but not rushed
6. **Error-Free:** Practice before recording
7. **Good Audio:** Use quality microphone
8. **Clean Background:** Minimize distractions
9. **Zoom Level:** Ensure text is readable
10. **Time Management:** Stay within 5-10 minutes

---

## 🔧 Technical Setup

### Screen Recording Settings
- **Resolution:** 1920x1080 (Full HD)
- **Frame Rate:** 30 fps
- **Audio:** 48kHz, stereo
- **Format:** MP4 (H.264)

### Recommended Tools
- **Windows:** OBS Studio, Camtasia
- **Mac:** QuickTime, ScreenFlow
- **Online:** Loom, Screencast-O-Matic

### Browser Setup
- **Zoom:** 100%
- **Extensions:** Disable unnecessary ones
- **DevTools:** Close unless showing technical details
- **Tabs:** Close extra tabs
- **Notifications:** Disable

---

## ✅ Pre-Recording Checklist

- [ ] Backend server running
- [ ] Frontend server running
- [ ] Test users created
- [ ] Sample data loaded
- [ ] Browser cache cleared
- [ ] Screen recording software tested
- [ ] Microphone working
- [ ] Script reviewed
- [ ] Demo flow practiced
- [ ] Backup plan ready

---

## 🎬 Post-Recording

1. **Review:** Watch entire video
2. **Edit:** Remove mistakes, add transitions
3. **Add:** Intro/outro screens
4. **Captions:** Add subtitles if possible
5. **Export:** High quality MP4
6. **Upload:** YouTube (unlisted) or Google Drive
7. **Test:** Verify playback quality
8. **Submit:** Include link in submission

---

**Good luck with your demo! 🚀**

**Contact:** r.kaze@alustudent.com | +250 780 866 714
