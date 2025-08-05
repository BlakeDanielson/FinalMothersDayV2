# Unsplash Image URLs Updated

**Date:** January 2025  
**File:** `src/lib/constants/placeholderRecipes.ts`

## Summary

Updated broken Unsplash image URLs in the placeholder recipes file. Out of 17 total URLs tested, 10 were broken (404 errors) and have been replaced with working alternatives.

## Broken URLs Replaced

### Recipe Images
1. **Spaghetti Carbonara (Pasta)**
   - Old: `photo-1565299624946-b28f40a0ca4b` ❌
   - New: `photo-1473093295043-cdd812d0e601` ✅

2. **Avocado Bruschetta (Appetizer)**
   - Old: `photo-1572441713132-51c75654db73` ❌
   - New: `photo-1546554137-f86b9593a222` ✅

3. **Chocolate Chip Cookies (Dessert)**
   - Old: `photo-1551024601-bec78d8d590d` ❌
   - New: `photo-1499636136210-6f4ee915583e` ✅

4. **Beef Stir Fry**
   - Old: `photo-1608039819226-e6ea12c05aa2` ❌
   - New: `photo-1546833999-b9f581a1996d` ✅

5. **Roast Turkey (Thanksgiving)**
   - Old: `photo-1574966771070-9639608a1173` ❌
   - New: `photo-1507048331197-7d4ac70811cf` ✅

6. **Lamb Chops**
   - Old: `photo-1600891964091-bab6873a49dc` ❌
   - New: `photo-1588166524941-3bf61a9c41db` ✅

7. **BBQ Pulled Pork**
   - Old: `photo-1628268900122-c0a3a9ade820` ❌
   - New: `photo-1544025162-d76694265947` ✅

8. **Iced Tea (Drinks)**
   - Old: `photo-1551030173-1b2ff3648450` ❌
   - New: `photo-1556679343-c7306c1976bc` ✅

9. **Garlic Aioli (Sauce)**
   - Old: `photo-1562504648-5b7a96109ba3` ❌
   - New: `photo-1607532941433-304659e8198a` ✅

10. **Vegetables**
    - Old: `photo-1597362925123-77861d3fbac8` ❌
    - New: `photo-1540420773420-3366772f4999` ✅

### Category Default Images
Updated corresponding URLs in the `ALL_POSSIBLE_CATEGORIES` array to match the new working recipe images.

## URLs That Remained Working
- Vegetable Green Curry: `photo-1455619452474-d2be8b1e70cd` ✅
- Quinoa Salad: `photo-1540189549336-e6e99c3679fe` ✅
- Grilled Chicken: `photo-1567620905732-2d1ec7ab7445` ✅
- Pan-Seared Salmon: `photo-1571091718767-18b5b1457add` ✅
- Tomato Soup: `photo-1547592180-85f173990554` ✅
- Breakfast (Category): `photo-1484723091739-30a097e8f929` ✅
- Side Dish (Category): `photo-1540420773420-3366772f4999` ✅

## Verification
All 16 updated URLs have been verified as working (returning HTTP 200 status codes) as of January 2025.

## Impact
- ✅ Fixed all broken placeholder recipe images
- ✅ Fixed all broken category default images  
- ✅ Improved user experience by preventing 404 image errors
- ✅ All images maintain appropriate aspect ratios and quality settings 