import EDrugTypes from "@/types/EDrugTypes";
import EOrderTypes from "@/types/EOrderTypes";
import EOrganizationTypes from "@/types/EOrganizationTypes";
import EPractitionerTypes from "@/types/EPractitionerTypes";
import EProductTypes from "@/types/EProductTypes";
import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";

export interface IAuthClient extends Service {
  login(email: string, password: string): Promise<IJsonResponse>;

  getAllPermissions(): Promise<IJsonResponse>;

  changeUserPassword(id: number, newPassword: string): Promise<IJsonResponse>;

  logout(): Promise<boolean>;
}

export interface IAdminUsersClient extends Service {
  getUsers(
    query: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getUser(id: number): Promise<IJsonResponse>;

  deleteUser(id: number): Promise<IJsonResponse>;

  updateUser(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    roleType: string,
    permissions: number[]
  ): Promise<IJsonResponse>;

  disableUser(id: number): Promise<IJsonResponse>;

  enableUser(id: number): Promise<IJsonResponse>;

  createAdminUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    roleType: string,
    permissions: number[]
  ): Promise<IJsonResponse>;

  getCurrentAdmin(): Promise<IJsonResponse>;

}

export interface IAdminAgentsClient extends Service {
  getAgents(
    query: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getAgent(id: number): Promise<IJsonResponse>;

  deleteAgent(id: number): Promise<IJsonResponse>;

  updateAgent(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    availability: boolean,
  ): Promise<IJsonResponse>;

  changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse>;

  updateAgentCredentials(
    id: number,
    email: string,
    password: string
  ): Promise<IJsonResponse>;

  createAgent(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    profilePhoto: File,
    rideId: number,
    password: string,
  ): Promise<IJsonResponse>;

  toggleAgentAvailability(id: number): Promise<IJsonResponse>;

  getActiveAgents(
    query: string,
    page?: number,
    pageSize?: number 
  ): Promise<IJsonResponse>;
}

export interface IAdminCustomersClient extends Service {
  getCustomers(
    query: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getCustomer(id: number): Promise<IJsonResponse>;

  deleteCustomer(id: number): Promise<IJsonResponse>;

  createCustomer(
    firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string, 
    profilePhoto: File,
    address: string,
    gender: string,
    age: string,
    password: string, 
  ): Promise<IJsonResponse>;

  updateCustomer(
    id: number,
    firstName: string,
    lastName: string,
    email: string, 
    phoneNumber: string, 
    address: string,
    gender: string,
    age: string,
  ): Promise<IJsonResponse>;
}

export interface IAdminOrganizationsClient extends Service {
  getOrganizations(
    type: EOrganizationTypes,
    query: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getOrganization(id: number): Promise<IJsonResponse>;

  deleteOrganization(id: number): Promise<IJsonResponse>;

  createOrganization(
    name: string,
    email: string,
    description: string,
    address: string,
    phoneNumber: string,
    profilePhoto: File,
    latitude: number,
    longitude: number,
    organizationType: EOrganizationTypes,
    password: string
  ): Promise<IJsonResponse>;

  updateOrganization(
    id: number,
    name: string,
    email: string,
    description: string,
    address: string,
    phoneNumber: string,
    latitude: number,
    longitude: number,
  ): Promise<IJsonResponse>;

  changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse>;

}

export interface IAdminPractitionersClient extends Service {
  getPractitioners(
    type: EPractitionerTypes,
    query: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getPractitioner(id: number): Promise<IJsonResponse>;

  deletePractitioner(id: number): Promise<IJsonResponse>;
}

export interface IAdminOrdersClient extends Service {
  getOrders(
    status: EOrderTypes | null,
    query: string,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getOrder(id: number): Promise<IJsonResponse>;

  deleteOrder(id: number): Promise<IJsonResponse>;

  assignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse>;

  unassignOrderToAgent(orderId: number, agentId: number): Promise<IJsonResponse>;
}

export interface IAdminTripClient extends Service {
  getTrips(
    status: EOrderTypes,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getTrip(id: number): Promise<IJsonResponse>;

  getTripsByAgent(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;
  
  getTripsByCustomer(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getTripsByOrder(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getTripsByOrganization(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;
}

export interface IProductsClient extends Service {
  getProducts(
    type: EProductTypes,
    location: string,
    query: string, 
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getProduct(id: number): Promise<IJsonResponse>;

  getProductsByOrganization(
    id: number,
    type: string, 
    query: string,
    page?: number, 
    pageSize?: number
  ): Promise<IJsonResponse>;

  createProduct(
    name: string,
    description: string,
    image: File,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: EDrugTypes,
    productType: EProductTypes
  ): Promise<IJsonResponse>;

  createProductForOrganization(
    organizationId: number,
    name: string,
    description: string,
    image: File,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: EDrugTypes,
    productType: EProductTypes 
  ): Promise<IJsonResponse>;

  deleteProduct(id: number): Promise<IJsonResponse>;

  updateProduct(
    id: number,
    name: string,
    description: string,
    price: number,
    quantityInStock: number,
    dosage: string,
    drugType: string,
    productType: string
  ): Promise<IJsonResponse>;

  changeProductImage(id: number, image: File): Promise<IJsonResponse>;
}

export interface IAdminRidesClient {
  getRides(
    query: string,
    page: number,
    pageSize: number,
  ): Promise<IJsonResponse>;

  createRide(
    name: string,
    model: string,
    brand: string,
    licensePlate: string,
    photo: File
  ): Promise<IJsonResponse>;

  getRide(id: number): Promise<IJsonResponse>;

  deleteRide(id: number): Promise<IJsonResponse>;

  updateRide(
    id: number,
    name: string,
    brand: string,
    model: string,
    licensePlate: string
  ): Promise<IJsonResponse>;

  changeRidePhoto(id: number, photo: File): Promise<IJsonResponse>;
}