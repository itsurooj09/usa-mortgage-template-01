export interface BranchLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  stateCode: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  nmlsId: string;
  serviceRadius: string;
}

export const branchLocations: BranchLocation[] = [
  {
    id: "charlotte-hq",
    name: "Charlotte Corporate Headquarters",
    city: "Charlotte",
    state: "North Carolina",
    stateCode: "NC",
    address: "1200 Financial Plaza, Suite 450, Charlotte, NC 28202",
    phone: "(800) 555-8290",
    email: "charlotte@northstarmortgage.com",
    manager: "David Vance (NMLS #847291)",
    nmlsId: "1948271",
    serviceRadius: "Serving all of North Carolina and South Carolina",
  },
  {
    id: "raleigh-triangle",
    name: "Raleigh - Research Triangle Branch",
    city: "Raleigh",
    state: "North Carolina",
    stateCode: "NC",
    address: "4140 Parklake Avenue, Suite 210, Raleigh, NC 27612",
    phone: "(919) 555-0144",
    email: "raleigh@northstarmortgage.com",
    manager: "Marcus Reynolds (NMLS #910244)",
    nmlsId: "1948271-002",
    serviceRadius: "Raleigh, Durham, Chapel Hill, Cary, Apex",
  },
  {
    id: "atlanta-metro",
    name: "Atlanta Regional Lending Office",
    city: "Atlanta",
    state: "Georgia",
    stateCode: "GA",
    address: "3340 Peachtree Road NE, Suite 1000, Atlanta, GA 30326",
    phone: "(404) 555-0199",
    email: "atlanta@northstarmortgage.com",
    manager: "Amanda Chen (NMLS #1049283)",
    nmlsId: "1948271-003",
    serviceRadius: "Greater Atlanta Metro, Alpharetta, Marietta, Buckhead",
  },
  {
    id: "tampa-suncoast",
    name: "Tampa Bay Lending Center",
    city: "Tampa",
    state: "Florida",
    stateCode: "FL",
    address: "401 E Jackson Street, Suite 1800, Tampa, FL 33602",
    phone: "(813) 555-0177",
    email: "tampa@northstarmortgage.com",
    manager: "David Vance (NMLS #847291)",
    nmlsId: "1948271-004",
    serviceRadius: "Tampa, St. Petersburg, Clearwater, Sarasota, Orlando",
  },
  {
    id: "austin-texas",
    name: "Austin Texas Lending Center",
    city: "Austin",
    state: "Texas",
    stateCode: "TX",
    address: "100 Congress Avenue, Suite 2000, Austin, TX 78701",
    phone: "(512) 555-0188",
    email: "austin@northstarmortgage.com",
    manager: "Amanda Chen (NMLS #1049283)",
    nmlsId: "1948271-005",
    serviceRadius: "Austin, Round Rock, San Antonio, Dallas, Houston",
  },
  {
    id: "denver-rockies",
    name: "Denver Front Range Branch",
    city: "Denver",
    state: "Colorado",
    stateCode: "CO",
    address: "1600 17th Street, Suite 500, Denver, CO 80202",
    phone: "(303) 555-0122",
    email: "denver@northstarmortgage.com",
    manager: "David Vance (NMLS #847291)",
    nmlsId: "1948271-006",
    serviceRadius: "Denver, Boulder, Colorado Springs, Fort Collins",
  },
];
