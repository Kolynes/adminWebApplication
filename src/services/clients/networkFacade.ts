import ERoleTypes from "@/types/ERoleTypes";
import EUserType from "@/types/EUserType";
import JsonResponseFacade from "@/utils/http/JsonResponseFacade";

const permissionModelFacades: any[] = [
  {
    "createdOnDate": "2021-10-30T05:58:58.370Z",
    "description": "Simple description",
    "id": 0,
    "name": "read",
    "roles": [
      {
        "createdOnDate": "2021-10-30T05:58:58.370Z",
        "description": "string",
        "id": 0,
        "name": "string"
      }
    ]
  }
];
const rides = [
  {
    "id": 1,
    "name": "Volvo",
    "model": "2010",
    "brand": "VL",
    "licensePlate": "124243 BW",
    "photo": "https://via.placeholder.com/120",
    "assigned": true
  },
  {
    "id": 1,
    "name": "BMW",
    "model": "2010",
    "brand": "VL",
    "licensePlate": "124243 BW",
    "photo": "https://via.placeholder.com/120",
    "assigned": false
  },
  {
    "id": 2,
    "name": "Benz",
    "model": "2010",
    "brand": "VL",
    "licensePlate": "124243 BW",
    "photo": "https://via.placeholder.com/120",
    "assigned": true
  },
  {
    "id": 3,
    "name": "Range Rover",
    "model": "2010",
    "brand": "VL",
    "licensePlate": "124243 BW",
    "photo": "https://via.placeholder.com/120",
    "assigned": true

  },
]

const usersFacade = [
  {
    id: 1,
    firstName: "Collins",
    lastName: "Chinedu",
    email: "kolyneschinedu@gmail.com",
    active: true,
    available: true,
    lockedUtilDate: "",
    permissions: permissionModelFacades,
    phoneNumber: "08131651917",
    location: "Wuse, Abuja",
    profilePhoto: "https://via.placeholder.com/120",
    role: {
      id: 1,
      name: ERoleTypes.superAdmin,
      description: "administration",
      createdOnDate: new Date().toISOString()
    },
    userType: EUserType.Admin,
    ride: rides[0],
    token: "",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "kolyneschinedu@gmail.com",
    active: false,
    available: false,
    lockedUtilDate: "",
    permissions: permissionModelFacades,
    phoneNumber: "08131651917",
    location: "Wuse, Abuja",
    profilePhoto: "https://via.placeholder.com/120",
    role: {
      id: 1,
      name: ERoleTypes.admin,
      description: "administration",
      createdOnDate: new Date().toISOString()
    },
    userType: EUserType.Admin,
    token: "",
  }
]

const organizationModelFacades = [
  {
    "id": 1,
    "name": "Simple Pharmacy",
    "email": "simplepharmacy@gmail.com",
    "profilePhoto": "https://via.placeholder.com/120",
    "description": "this is a test",
    "latitude": 10,
    "longitude": 10,
    "address": "Lagos",
    "phoneNumber": "08131651917",
    "type": "PHARMACY",
  },
  {
    "id": 2,
    "name": "The New Pharmacy",
    "email": "simplepharmacy@gmail.com",
    "profilePhoto": "https://via.placeholder.com/120",
    "description": "this is a test",
    "latitude": 10,
    "longitude": 10,
    "address": "Lagos",
    "phoneNumber": "08131651917",
    "type": "PHARMACY",
  },
  {
    "id": 3,
    "name": "The Expanded Pharmacy",
    "email": "simplepharmacy@gmail.com",
    "profilePhoto": "https://via.placeholder.com/120",
    "description": "this is a test",
    "latitude": 10,
    "longitude": 10,
    "address": "Lagos",
    "phoneNumber": "08131651917",
    "type": "PHARMACY",
  }
];

const practitionerModelFacade = [
  {
    "id": 1,
    "name": "Collins Chinedu",
    "address": "Abuja",
    "email": "kolyneschinedu@gmail.com",
    "profilePhoto": "https://via.placeholder.com/120",
    "specialties": "Nursing",
    "companyName": "Kolynes Inc",
    "mobileNo": "08131651917",
    "type": "NURSE",
    "identificationType": "",
    "identificationPhoto": "",
    "verificationType": "",
    "verificationPhoto": ""
  },
  {
    "id": 2,
    "name": "International Ambulance Aid",
    "address": "Abuja",
    "email": "kolyneschinedu@gmail.com",
    "profilePhoto": "https://via.placeholder.com/120",
    "specialties": "Nursing",
    "companyName": "Kolynes Inc",
    "mobileNo": "08131651917",
    "type": "AMBULANCE",
    "identificationType": "",
    "identificationPhoto": "",
    "verificationType": "",
    "verificationPhoto": ""
  },
  {
    "id": 3,
    "name": "James Bond",
    "address": "Lagos",
    "email": "kolyneschinedu@gmail.com",
    "profilePhoto": "https://via.placeholder.com/120",
    "specialties": "Surgery",
    "companyName": "Kolynes Inc",
    "mobileNo": "08131651917",
    "type": "DOCTOR",
    "identificationType": "",
    "identificationPhoto": "",
    "verificationType": "",
    "verificationPhoto": ""
  },
  {
    "id": 4,
    "name": "Clade Kim",
    "address": "Anambra",
    "email": "kolyneschinedu@gmail.com",
    "profilePhoto": "https://via.placeholder.com/120",
    "specialties": "Nursing",
    "companyName": "Kolynes Inc",
    "mobileNo": "08131651917",
    "type": "PHYSIOTHERAPIST",
    "identificationType": "",
    "identificationPhoto": "",
    "verificationType": "",
    "verificationPhoto": ""
  },
];

const productModelFacade = [
  {
    "id": 1,
    "name": "New Product",
    "organizationId": 1,
    "organizationName": "Simple Pharmacy",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 1200.0,
    "quantityInStock": 10,
    "dosage": "This is a test dosage",
    "drugType": "OTC",
    "productType": "DRUG"
  },
  {
    "id": 2,
    "name": "Second New Product",
    "organizationId": 1,
    "organizationName": "Simple Pharmacy",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 3000.0,
    "quantityInStock": 10,
    "dosage": "This is a test dosage",
    "drugType": "OTC",
    "productType": "DRUG"
  },
  {
    "id": 3,
    "name": "New POM Product",
    "organizationId": 1,
    "organizationName": "Simple Pharmacy",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 10000.0,
    "quantityInStock": 10,
    "dosage": "This is a test dosage",
    "drugType": "POM",
    "productType": "DRUG"
  },
  {
    "id": 4,
    "name": "New Equipment",
    "organizationId": 1,
    "organizationName": "Simple OEM",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 12300.0,
    "quantityInStock": 10,
    "dosage": "",
    "drugType": "",
    "productType": "EQUIPMENT"
  },
  {
    "id": 5,
    "name": "Second New Equipment",
    "organizationId": 1,
    "organizationName": "Simple OEM",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 12300.0,
    "quantityInStock": 10,
    "dosage": "",
    "drugType": "",
    "productType": "EQUIPMENT"
  },
];

const orderItemModelFacade = [
  {
    "id": 1,
    "name": "New Product",
    "organizationId": 1,
    "organizationName": "Simple Pharmacy",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 1200.0,
    "quantityInStock": 10,
    "dosage": "This is a test dosage",
    "drugType": "OTC",
    "productType": "DRUG",
    "quantity": 2
  },
  {
    "id": 2,
    "name": "Second New Product",
    "organizationId": 1,
    "organizationName": "Simple Pharmacy",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 3000.0,
    "quantityInStock": 10,
    "dosage": "This is a test dosage",
    "drugType": "OTC",
    "productType": "DRUG",
    "quantity": 2
  },
  {
    "id": 3,
    "name": "New POM Product",
    "organizationId": 1,
    "organizationName": "Simple Pharmacy",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 10000.0,
    "quantityInStock": 10,
    "dosage": "This is a test dosage",
    "drugType": "POM",
    "productType": "DRUG",
    "quantity": 2
  },
  {
    "id": 4,
    "name": "New Equipment",
    "organizationId": 1,
    "organizationName": "Simple OEM",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 12300.0,
    "quantityInStock": 10,
    "dosage": "",
    "drugType": "",
    "productType": "EQUIPMENT",
    "quantity": 2
  },
  {
    "id": 5,
    "name": "Second New Equipment",
    "organizationId": 1,
    "organizationName": "Simple OEM",
    "description": "This is a test description",
    "image": "https://via.placeholder.com/120",
    "price": 12300.0,
    "quantityInStock": 10,
    "dosage": "",
    "drugType": "",
    "productType": "EQUIPMENT",
    "quantity": 2
  },
];


const orderModelFacades = [
  {
    "id": 1,
    "customerId": 1,
    "agentId": 1,
    "customerSignature": "nxknkvnfdds",
    "status": "Processing",
    "prescriptionUrl": "https://via.placeholder.com/120",
    "totalPrice": 12334.0,
    "deliveryAddress": "Kwali, Abuja",
    "date": "Wed Oct 12 2021",
    "orderItems": orderItemModelFacade
  },
  {
    "id": 3,
    "customerId": 1,
    "customerSignature": "nxknkvnfdds",
    "status": "Cancelled",
    "prescriptionUrl": "https://via.placeholder.com/120",
    "totalPrice": 12334.0,
    "deliveryAddress": "Kwali, Abuja",
    "date": "Wed Oct 12 2021",
    "orderItems": orderItemModelFacade
  },
  {
    "id": 4,
    "customerId": 1,
    "customerSignature": "nxknkvnfdds",
    "status": "Completed",
    "prescriptionUrl": "https://via.placeholder.com/120",
    "totalPrice": 12334.0,
    "deliveryAddress": "Kwali, Abuja",
    "date": "Wed Oct 12 2021",
    "orderItems": orderItemModelFacade
  },
];

const tripModelFacades: any[] = [
  
]


const networkFacade = {
  "/admin/users": new JsonResponseFacade(
    200,
    usersFacade
  ),
  "/admin/users/1": new JsonResponseFacade(
    200,
    usersFacade[0]
  ),
  "/admin/users/1/disable": new JsonResponseFacade(200),
  "/admin/users/1/enable": new JsonResponseFacade(200),
  "/admin/users/adminuser": new JsonResponseFacade(201),
  "/admin/users/current": new JsonResponseFacade(
    200,
    usersFacade[0]
  ),

  "/admin/users/agents": new JsonResponseFacade(
    200,
    usersFacade
  ),
  "/admin/users/agents/1": new JsonResponseFacade(
    200,
    usersFacade[0]
  ),
  "/admin/users/agents/1/credentials": new JsonResponseFacade(200),
  "/deliveryagents/1/availability": new JsonResponseFacade(200),
  "/deliveryagents/active": new JsonResponseFacade(
    200,
    usersFacade
  ),

  "/admin/users/customers": new JsonResponseFacade(
    200,
    usersFacade
  ),
  "/admin/users/customers/1": new JsonResponseFacade(
    200,
    usersFacade[0]
  ),

  "/admin/users/organizations": new JsonResponseFacade(
    200,
    organizationModelFacades
  ),
  "/admin/users/organizations/1": new JsonResponseFacade(
    200,
    organizationModelFacades[0]
  ),

  "/admin/users/practitioners": new JsonResponseFacade(
    200,
    practitionerModelFacade
  ),
  "/admin/users/practitioners/1": new JsonResponseFacade(
    200,
    practitionerModelFacade[0]
  ),

  "/admin/orders": new JsonResponseFacade(
    200,
    orderModelFacades
  ),
  "/admin/orders/1": new JsonResponseFacade(
    200,
    orderModelFacades[0]
  ),
  "/admin/orders/1/assign/1": new JsonResponseFacade(200),

  "/admin/trips": new JsonResponseFacade(
    200,
    tripModelFacades
  ),
  "/admin/trips/1": new JsonResponseFacade(
    200,
    tripModelFacades[0]
  ),
  "/admin/trips/agents/1": new JsonResponseFacade(
    200,
    tripModelFacades
  ),
  "/admin/trips/customers/1": new JsonResponseFacade(
    200,
    tripModelFacades
  ),
  "/admin/trips/orders/1": new JsonResponseFacade(
    200,
    tripModelFacades
  ),
  "/admin/trips/organizations/1": new JsonResponseFacade(
    200,
    tripModelFacades
  ),

  "/products/all": new JsonResponseFacade(
    200,
    productModelFacade
  ),
  "/products/1": new JsonResponseFacade(
    200,
    productModelFacade[0]
  ),
  "/products/organizations/1": new JsonResponseFacade(
    200,
    productModelFacade
  ),
  "/products/create": new JsonResponseFacade(
    201,
  ),
  "/products/create/organizations/1": new JsonResponseFacade(
    201,
  ),
  "/products/delete/1": new JsonResponseFacade(
    200
  ),
  "/products/update/1": new JsonResponseFacade(
    200
  ),

  "/admin/auth/login": new JsonResponseFacade(
    200,
    usersFacade[0]
  ),
  "/admin/auth/permissions": new JsonResponseFacade(
    200,
    permissionModelFacades
  ),
  "/admin/auth/changepassword": new JsonResponseFacade(200),
  "/users/logout": new JsonResponseFacade(200),

  "/admin/rides": new JsonResponseFacade(
    200,
    rides
  ),
  "/admin/rides/1": new JsonResponseFacade(
    200,
    rides[0]
  )
};

export default networkFacade;