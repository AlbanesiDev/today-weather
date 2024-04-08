import { Pipe,  type PipeTransform } from "@angular/core";
/**
 * Transforms a Unix timestamp into a Date object.
 */
@Pipe({
  name: "UnixTimestamp",
  standalone: true,
})
export class UnixTimestampPipe implements PipeTransform {
  /**
   * Takes a Unix timestamp and converts it to a Date object.
   *
   * @param unixTimestamp The Unix timestamp to be transformed.
   * @returns The Date object representing the given Unix timestamp.
   */
  transform(unixTimestamp: number): Date {
    const date = new Date(unixTimestamp * 1000);
    return date;
  }
}
