import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from "@angular/platform-browser";

/**
 * Pipe that takes an image on the 64 and clean the new lines and sanitize it
 *
 * @param {string} value  The file in 64 format
 * @returns The image safe to use anywhere
 */
@Pipe({
	name: 'makeTrustedImage'
})
export class MakeTrustedImage implements PipeTransform {
	
	constructor(private sanitizer: DomSanitizer) {}

	public transform(value: any): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		let imageString =  JSON.stringify(value).replace(/\\n/g, '');
		const style = 'url(' + imageString + ')';
		return this.sanitizer.bypassSecurityTrustStyle(style);
	}
}
