// Capture our screen dimensions //
var rspnsv_screenWidth = screen.width;
var rspnsv_screenHeight = screen.height;
// var rspnsv_screenDiagonal = Math.sqrt((rspnsv_screenWidth * rspnsv_screenWidth) + (rspnsv_screenHeight * rspnsv_screenHeight));
var rspnsv_screenAverage = (rspnsv_screenWidth + rspnsv_screenHeight) / 2;

// Establish our parameters for field of view and fovial vision //
var rspnsv_fov = 30; // About 30 degree fov monitor viewing.
var rspnsv_fv = 1; // fovial vision, in degrees, for 4 letters. Usually 1 degree.

// Calculate ratio, apply to monitor resolution //
var rspnsv_f_ratio = rspnsv_fv / rspnsv_fov;

// Focial diameter in pixels, for 4 letters //
var rspnsv_f_pixels = rspnsv_screenAverage * rspnsv_f_ratio;

// Diameter of 1 lowercase letter //
var rspnsv_px_lcDiameter = rspnsv_f_pixels / 4;

// The Golden Ratio, since we can't really calculate the font's x-height
var rspnsv_g_ratio = 1.61803399;

// Evaluate users font size.
$("body").append('<p id="rspnsv_usr_fontHeight">x</p>');
var rspnsv_usr_fontObj = $("#rspnsv_usr_fontHeight");
$(rspnsv_usr_fontObj).css("line-height", "100%");
$(rspnsv_usr_fontObj).css("padding", "0px");
$(rspnsv_usr_fontObj).css("margin", "0px");
var rspnsv_usr_px_fontHeight = rspnsv_usr_fontObj.height();
var rspnsv_usr_px_lcDiameter = rspnsv_usr_px_fontHeight / rspnsv_g_ratio;
$(rspnsv_usr_fontObj).remove();
var rspnsv_px_fontHeight = rspnsv_px_lcDiameter * rspnsv_g_ratio;

// Apply the larger of the users setting, or the new setting. If their's is bigger for better clarity, we should respect that preference.
var rspnsv_fontHeight = Math.max(rspnsv_usr_px_fontHeight, rspnsv_px_fontHeight);
var rspnsv_em_fontHeight = Math.round( (rspnsv_fontHeight / rspnsv_usr_px_fontHeight) * 1000) / 1000;
var rspnsv_lcDiameter = Math.max(rspnsv_usr_px_lcDiameter, rspnsv_px_lcDiameter);
var rspnsv_lineHeight = rspnsv_lcDiameter * 2;
var rspnsv_em_lineHeight = Math.round( (rspnsv_lineHeight / rspnsv_fontHeight) * 1000) / 1000;
var rspnsv_em_spaceAfter = Math.round((rspnsv_em_lineHeight / 2) * 1000) / 1000;

// AUTOMAGICALLY CALCULATE THE IDEAL LINELENGTHS FOR THIS FONT SIZE
// COMPARE THE 'alphabet-and-a-half rule' TO THE 'points-times-two' RULE
// Use the 30 character rule for the minimum length per newspaper spec.
var rspnsv_maxLength = Math.max(39, Math.round(rspnsv_fontHeight * 2));
// var rspnsv_minLength = Math.min(30, Math.round(rspnsv_fontHeight * 2));
var rspnsv_px_maxLength = Math.round(rspnsv_maxLength * rspnsv_fontHeight);
// var rspnsv_px_minLength = Math.round(rspnsv_minLength * rspnsv_fontHeight);

// Set default type properties
var rspnsv_elements = "h1, h2, h3, h4, h5, h6, p, li, input, textarea";
$("body, li").css("font-size", rspnsv_em_fontHeight+"em");
$("body").css("line-height", rspnsv_em_lineHeight+"em");
$("h1, h2").css("margin-top", rspnsv_em_spaceAfter+"em");
$("p").css("margin-top", "0");
$(rspnsv_elements).css("margin-bottom", rspnsv_em_spaceAfter+"em");
$(rspnsv_elements).css("max-width", rspnsv_maxLength+"em");