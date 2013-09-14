/* [CMYK Model] */
var cmyk = new function() {

	/* [CMYK Inputs]*/
	this.cyan_input;
	this.magenta_input;
	this.yellow_input;
	this.black_input;

	/* [CMY Outputs]*/
	this.cyan_output;
	this.magenta_output;
	this.yellow_output;

	/*
	 * The colour conversions of this model are based on SWOP 2007 Specs
	 * http://www.swop.org/specification/SWOP2007Specserrata.pdf
	 */

	this.input_changed = function() {
		cmyk.cyan_input = $(".cyan-input")[0].value / 100;
		cmyk.magenta_input = $(".magenta-input")[0].value / 100;
		cmyk.yellow_input = $(".yellow-input")[0].value / 100;
		cmyk.black_input = $(".black-input")[0].value / 100;

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
		 // C = ( C * ( 1 - K ) + K )
		cmyk.cyan_output = (cmyk.cyan_input * (1 - cmyk.black_input)) + cmyk.black_input;
		cmyk.magenta_output = (cmyk.magenta_input * (1 - cmyk.black_input)) + cmyk.black_input;
		cmyk.yellow_output = (cmyk.yellow_input * (1 - cmyk.black_input)) + cmyk.black_input;

		debug_report(cmyk);
	}

}