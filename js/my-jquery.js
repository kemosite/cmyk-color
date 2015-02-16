/* [CMYK Model] */
var color_obj = new function() {

	/* [CMYK Inputs]*/
	this.cmyk_cyan_input;
	this.cmyk_magenta_input;
	this.cmyk_yellow_input;
	this.cmyk_black_input;

	/* [Lab Inputs] */
	this.lab_l_input;
	this.lab_a_input;
	this.lab_b_input;

	/* [Grey Balance] */
	this.grey_balance;

	/* [CMY Inputs]*/
	this.cmy_cyan_input;
	this.cmy_magenta_input;
	this.cmy_yellow_input;

	/* [RGB Inputs]*/
	this.rgb_red_input;
	this.rgb_green_input;
	this.rgb_blue_input;
	
	/* [RGB Colour Representation] */
	this.rgb_raw_color;
	this.red_input_pc;
	this.green_input_pc;
	this.blue_input_pc;

	/*
	 * The colour conversions of this model are based on SWOP 2007 Specs
	 * http://www.swop.org/specification/SWOP2007Specserrata.pdf
	 */

	this.input_changed = function() {
		color_obj.cmyk_cyan_input = $(".cmyk-cyan-input")[0].value / 100;
		color_obj.cmyk_magenta_input = $(".cmyk-magenta-input")[0].value / 100;
		color_obj.cmyk_yellow_input = $(".cmyk-yellow-input")[0].value / 100;
		color_obj.cmyk_black_input = $(".cmyk-black-input")[0].value / 100;

		color_obj.cmy_cyan_input = $(".cmy-cyan-input")[0];
		color_obj.cmy_magenta_input = $(".cmy-magenta-input")[0];
		color_obj.cmy_yellow_input = $(".cmy-yellow-input")[0];

		color_obj.rgb_red_input = $(".rgb-red-input")[0];
		color_obj.rgb_green_input = $(".rgb-green-input")[0];
		color_obj.rgb_blue_input = $(".rgb-blue-input")[0];
		
		color_obj.rgb_raw_color = $(".rgb-raw-color")[0];

		color_obj.red_input_pc = color_obj.rgb_red_input.value / 255;
		color_obj.green_input_pc = color_obj.rgb_green_input.value / 255;
		color_obj.blue_input_pc = color_obj.rgb_blue_input.value / 255;

		/*
		X Nt_R = nt_G * 0.4124 * 0.1805 * 0.3576 nt_B 
		Y Nt_R = nt_G * 0.2126 * 0.0722 * 0.7152 nt_B 
		Z Nt_R = nt_G * 0.0193 * 0.9505 * 0.1192 nt_B
		*/

		/* [sRGB XYZ] */
		// X = 0.9642, Y = 1, Z = 0.82491

		/* [Bradford Matrix] */
		/*
		0.8951000  0.2664000 -0.1614000
		-0.7502000  1.7135000  0.0367000
		 0.0389000 -0.0685000  1.0296000
		 */


		// debug_report(cmyk.rgb_raw_color);

		/*
		 * Neutral Print Density Curves
		 * Because SWOP now uses the G7 Proof-to-Print
		 * Process, Neutral Print Density Curves (NPDC) have
		 * become an important specification. The NPDC
		 * relationship is between measured neutral density and
		 * original halftone percentages on a gray scale. SWOP
		 * specifies the following NPDCs.
		 * To specify NPDCs we look at a 25% gray, a 50% gray
		 * and a 75% gray as defined:
		 * 25% gray 25%C 19%M 19%Y
		 * 50% gray 50%C 40%M 40%Y
		 * 75% gray 75%C 66%M 66%Y
		 */

		/* [Produce new CMY outout] */
		// Cyan * (1 - Black) + Black)
		// C = ( C * (1 -- K ) K ) 
		// M = ( M * (1 -- K ) K ) 
		// Y = ( Y * (1 -- K ) K )
		// M = Min(100, K * (74% + (2 ^ (K / 0.2)) / 100))
		// Y = Min(100, K * (74% + (2 ^ (K / 0.2)) / 100))
		color_obj.grey_balance = Math.min(100,Math.round(color_obj.cmyk_black_input * (0.74 + Math.pow(2, color_obj.cmyk_black_input / 0.20) / 100) * 100)) / 100;

		color_obj.cmy_cyan_input.value = Math.round(((color_obj.cmyk_cyan_input * (1 - color_obj.cmyk_black_input)) + color_obj.cmyk_black_input) * 100);
		color_obj.cmy_magenta_input.value = Math.round(((color_obj.cmyk_magenta_input * (1 - color_obj.grey_balance)) + color_obj.grey_balance) * 100);
		color_obj.cmy_yellow_input.value = Math.round(((color_obj.cmyk_yellow_input * (1 - color_obj.grey_balance)) + color_obj.grey_balance) * 100);

		/* [Representation of raw inputs] */
		color_obj.rgb_red_input.value = Math.round(255 * (1 - (color_obj.cmy_cyan_input.value / 100)));
		color_obj.rgb_green_input.value = Math.round(255 * (1 - (color_obj.cmy_magenta_input.value / 100)));
		color_obj.rgb_blue_input.value = Math.round(255 * (1 - (color_obj.cmy_yellow_input.value / 100)));
		
		// debug_report("background-color: #" + ("0" + parseInt(color_obj.red_input.value, 10).toString(16)).slice(-2) + ("0" + parseInt(color_obj.green_input.value, 10).toString(16)).slice(-2) + ("0" + parseInt(color_obj.blue_input.value, 10).toString(16)).slice(-2));
		$(color_obj.rgb_raw_color).css("background-color", "#" + ("0" + parseInt(color_obj.rgb_red_input.value, 10).toString(16)).slice(-2) + ("0" + parseInt(color_obj.rgb_green_input.value, 10).toString(16)).slice(-2) + ("0" + parseInt(color_obj.rgb_blue_input.value, 10).toString(16)).slice(-2));

		debug_report(color_obj);

	}

}