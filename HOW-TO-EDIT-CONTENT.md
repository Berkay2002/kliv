# How to Edit Website Content

**For: Kliv Idrottsförening Website Clients**

---

## Overview

All website text and images are centralized in **ONE FILE** for easy editing:

```
📁 config/content.ts
```

This file contains ALL editable content including:
- Organization information (address, phone, email)
- Team members (names, roles, emails, photos)
- Page text (home, judo, lovaktiviteter, contact)
- Navigation menu items
- Form labels and messages
- Social media links

---

## How to Edit Content

### Step 1: Open the Content File

Navigate to and open:
```
config/content.ts
```

### Step 2: Find the Section You Want to Edit

The file is organized into clearly labeled sections:

```typescript
// =============================================================================
// ORGANIZATION INFORMATION
// =============================================================================

// =============================================================================
// TEAM MEMBERS
// =============================================================================

// =============================================================================
// HOME PAGE CONTENT
// =============================================================================

// =============================================================================
// JUDO PAGE CONTENT
// =============================================================================

// And more...
```

### Step 3: Edit the Text

Simply change the text between the quotes. For example:

**Before:**
```typescript
export const organizationInfo = {
  contact: {
    email: "kontakt@klivif.se",
    phone: "+46 123 456 789",
  },
};
```

**After:**
```typescript
export const organizationInfo = {
  contact: {
    email: "newcontact@klivif.se",
    phone: "+46 987 654 321",
  },
};
```

### Step 4: Save and Test

1. Save the file (`Ctrl+S` or `Cmd+S`)
2. Run `npm run dev` to see changes locally
3. Run `npm run build` before deploying

---

## Common Editing Tasks

### 1. Update Contact Information

**Location:** `organizationInfo` section

```typescript
export const organizationInfo = {
  contact: {
    email: "YOUR_EMAIL_HERE",      // Change email
    phone: "YOUR_PHONE_HERE",      // Change phone
  },
  address: {
    street: "YOUR_STREET_HERE",    // Change address
    city: "YOUR_CITY_HERE",
    postalCode: "YOUR_POSTAL_CODE",
  },
};
```

### 2. Update Social Media Links

**Location:** `organizationInfo.socialMedia` section

```typescript
socialMedia: {
  facebook: "https://www.facebook.com/YOUR_PAGE",
  instagram: "https://www.instagram.com/YOUR_PROFILE/",
},
```

### 3. Update Team Members

**Location:** `teamMembers` section

**To edit an existing member:**
```typescript
{
  name: "John Doe",           // Change name
  role: "Chairman",           // Change role
  email: "john@klivif.se",    // Change email
  image: "",                  // Leave empty for auto-generated avatar
},
```

**To add a profile photo:**
1. Upload the photo to `/public/images/team/`
2. Update the image field:
```typescript
image: "/images/team/john-doe.jpg",
```

**To add a new team member:**
Add a new object to the array:
```typescript
export const teamMembers = [
  { name: "Existing Person 1", role: "Role", email: "email@klivif.se", image: "" },
  { name: "Existing Person 2", role: "Role", email: "email@klivif.se", image: "" },
  // Add new member here:
  { name: "New Person", role: "New Role", email: "new@klivif.se", image: "" },
];
```

**To remove a team member:**
Delete the entire member object (the part between `{` and `},`)

### 4. Update Home Page Text

**Location:** `homePage` section

Example - Change "Who We Are" section:
```typescript
whoWeAre: {
  title: "Who We Are",
  description: "YOUR NEW DESCRIPTION HERE",
},
```

Example - Change Vision Features:
```typescript
vision: {
  title: "Our Vision",
  features: [
    {
      title: "Fair Play",
      description: "YOUR NEW DESCRIPTION",  // Edit this
    },
    // ... more features
  ],
},
```

### 5. Update Judo Page Content

**Location:** `judoPage` section

```typescript
export const judoPage = {
  header: {
    title: "Judo",
    description: "YOUR NEW DESCRIPTION",
  },

  schedule: {
    ageGroup: "kids 7-12 years",      // Change age group
    days: "Mondays",                  // Change training days
    time: "17:30-19:30",              // Change training time
    location: "Kårsbyhallen",         // Change location
  },

  fees: {
    amount: "750kr",                  // Change fee amount
    period: "per term",               // Change period
    bankgiro: "5220-6166",            // Change bankgiro
  },
};
```

### 6. Update Contact Form

**Location:** `contactForm` section

```typescript
export const contactForm = {
  fields: {
    name: {
      label: "Name *",
      placeholder: "Your full name",  // Change placeholder
    },
    // ... more fields
  },

  buttons: {
    submit: "Send Message",           // Change button text
  },
};
```

### 7. Change Images

**For hero images, gallery images, etc:**

**Location:** Various page sections (e.g., `homePage.hero.images`)

```typescript
hero: {
  images: {
    landscape: [
      "/images/NEW_IMAGE_1.webp",     // Change image path
      "/images/NEW_IMAGE_2.webp",     // Change image path
      // Add or remove images from this array
    ],
  },
},
```

**To add a new image:**
1. Upload image to `/public/images/` folder
2. Add the path to the array:
   ```typescript
   "/images/your-new-image.webp",
   ```

**To remove an image:**
Delete the line with the image path

---

## Important Rules

### ✅ DO:
- Change text between quotes `"like this"`
- Update email addresses, phone numbers, addresses
- Add or remove team members
- Change image paths
- Edit descriptions and titles
- Save your changes before testing

### ❌ DON'T:
- Change the **structure** (the part before the colon `:`)
- Remove commas `,` at the end of lines (except the last item)
- Delete entire sections unless you know what you're doing
- Change file encoding (keep it as UTF-8)
- Forget to test after making changes

### Examples:

**CORRECT:**
```typescript
title: "New Title",  // ✅ Changed text only
```

**WRONG:**
```typescript
myTitle: "New Title",  // ❌ Changed the key name (structure)
```

**WRONG:**
```typescript
title: "New Title"   // ❌ Missing comma at end
email: "test@test.com",
```

---

## Testing Your Changes

### Local Testing (Recommended)

1. Open terminal in project folder
2. Run: `npm run dev`
3. Open browser to `http://localhost:3000`
4. Check if your changes appear correctly
5. Test all pages where you made changes

### Before Deployment

1. Stop the development server (Ctrl+C)
2. Run: `npm run build`
3. If build succeeds, you're ready to deploy
4. If build fails, check for syntax errors in `config/content.ts`

---

## Quick Reference: File Location

```
your-project/
├── config/
│   └── content.ts          ← EDIT THIS FILE
├── public/
│   └── images/             ← Upload images here
│       ├── team/          ← Team member photos
│       ├── judo/          ← Judo page images
│       └── ...
└── ...
```

---

## Troubleshooting

### Problem: Changes don't appear
**Solution:**
- Make sure you saved the file
- Restart dev server (`Ctrl+C`, then `npm run dev`)
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Problem: Website won't build
**Solution:**
- Check for syntax errors in `config/content.ts`
- Make sure all quotes are closed
- Make sure all commas are in place
- Restore from backup if needed

### Problem: Text appears as `{organizationInfo.name}`
**Solution:**
- The component hasn't been updated yet
- Contact your developer to update that component

### Problem: Image doesn't show
**Solution:**
- Check image path starts with `/` (e.g., `/images/photo.jpg`)
- Make sure image exists in `public/images/` folder
- Check image filename matches exactly (case-sensitive)

---

## Getting Help

If you encounter issues:
1. Check this guide first
2. Make sure you have a backup of your changes
3. Contact your web developer
4. Provide details about what you changed and what error you see

---

## Quick Start Checklist

- [ ] Open `config/content.ts`
- [ ] Find the section you want to edit
- [ ] Change the text between quotes `"..."`
- [ ] Save the file
- [ ] Run `npm run dev` to test
- [ ] Run `npm run build` before deploying
- [ ] Deploy your changes

---

## Content Sections Quick Reference

| What to Edit | Section Name | Location |
|--------------|-------------|----------|
| Contact info (email, phone) | `organizationInfo` | Line 39 |
| Team members | `teamMembers` | Line 66 |
| Navigation menu | `navigation` | Line 104 |
| Home page text | `homePage` | Line 115 |
| Judo page text | `judoPage` | Line 199 |
| Lovaktiviteter page | `lovaktiviteterPage` | Line 254 |
| Contact page | `contactPage` | Line 305 |
| Contact form | `contactForm` | Line 329 |
| Social media links | `organizationInfo.socialMedia` | Line 56 |
| Footer text | `footer` | Line 393 |

---

**Last Updated:** 2025-01-09
**Version:** 1.0
**For:** Kliv Idrottsförening Website

For technical support, contact your web developer.
