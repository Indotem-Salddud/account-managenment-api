/**
 * ! Direction interface to accomplish user direction data
 * * whitehatdevv - 2021/12/14
 */
export interface Direction {
  street: string;
  number: string;
  additionalInformation?: string;
  city: string;
  postalCode: string;
  country: string;
}
