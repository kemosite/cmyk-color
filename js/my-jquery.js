/* [CMYK Model] */
var cmyk = new function() {

	/* [CMYK Inputs]*/
	this.cyan_input;
	this.magenta_input;
	this.yellow_input;
	this.black_input;

	this.grey_balance;

	/* [CMY Outputs]*/
	this.cyan_output;
	this.magenta_output;
	this.yellow_output;

	/* [RGB Inputs]*/
	this.red_input;
	this.green_input;
	this.blue_input;
	this.rgb_raw_color;

	/*
	 * The colour conversions of this model are based on SWOP 2007 Specs
	 * http://www.swop.org/specification/SWOP2007Specserrata.pdf
	 */

	this.input_changed = function() {
		cmyk.cyan_input = $(".cyan-input")[0].value / 100;
		cmyk.magenta_input = $(".magenta-input")[0].value / 100;
		cmyk.yellow_input = $(".yellow-input")[0].value / 100;
		cmyk.black_input = $(".black-input")[0].value / 100;

		cmyk.cyan_output = $(".cyan-output")[0];
		cmyk.magenta_output = $(".magenta-output")[0];
		cmyk.yellow_output = $(".yellow-output")[0];

		cmyk.red_input = $(".red-input")[0];
		cmyk.green_input = $(".green-input")[0];
		cmyk.blue_input = $(".blue-input")[0];
		cmyk.rgb_raw_color = $(".rgb-raw-color")[0];

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

		// M = K * (76% + ((K - 0.25) * 0.24))
		// Y = K * (76% + ((K - 0.25) * 0.24))
		// (cmyk.cyan_input * (1 - cmyk.black_input)) + cmyk.black_input
		cmyk.grey_balance = Math.round((cmyk.black_input * (0.75 + ((cmyk.black_input - 0.25) * 0.25))) * 100) / 100;

		cmyk.cyan_output.value = ((cmyk.cyan_input * (1 - cmyk.black_input)) + cmyk.black_input) * 100;
		cmyk.magenta_output.value = ((cmyk.magenta_input * (1 - cmyk.grey_balance)) + cmyk.grey_balance) * 100;
		cmyk.yellow_output.value = ((cmyk.yellow_input * (1 - cmyk.grey_balance)) + cmyk.grey_balance) * 100;

		/* [Representation of raw inputs] */
		cmyk.red_input.value = Math.round(255 * (1 - (cmyk.cyan_output.value / 100)));
		cmyk.green_input.value = Math.round(255 * (1 - (cmyk.magenta_output.value / 100)));
		cmyk.blue_input.value = Math.round(255 * (1 - (cmyk.yellow_output.value / 100)));
		// debug_report("background-color: #" + ("0" + parseInt(cmyk.red_input.value, 10).toString(16)).slice(-2) + ("0" + parseInt(cmyk.green_input.value, 10).toString(16)).slice(-2) + ("0" + parseInt(cmyk.blue_input.value, 10).toString(16)).slice(-2));
		$(cmyk.rgb_raw_color).css("background-color", "#" + ("0" + parseInt(cmyk.red_input.value, 10).toString(16)).slice(-2) + ("0" + parseInt(cmyk.green_input.value, 10).toString(16)).slice(-2) + ("0" + parseInt(cmyk.blue_input.value, 10).toString(16)).slice(-2));
		
		debug_report(cmyk);
	}

}