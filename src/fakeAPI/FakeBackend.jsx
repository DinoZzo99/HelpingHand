import React from "react";
import categories from "../mockupData/category.json";

import services from "../mockupData/service.json";
import createdJobs from "../mockupData/created.json";
import appliedJobs from "../mockupData/applied.json";

import donations from "../mockupData/donation.json";
import createdDonations from "../mockupData/createdDonations.json";

import users from "../mockupData/user.json";
import contacts from "../mockupData/contacts.json";


function FakeBackend() {

    return(
        <p>This is fake backend</p>
    )
}

export default FakeBackend;

// categories
export function GetAllCategories() {
    return categories;
}

export function GetServiceCategories() {
    let services = categories.filter(category => category.service == 1);
    return services;
}

export function GetDonationCategories() {
    let donations = categories.filter(category => category.service == 0);
    return donations;
}

export function GetCategoryById(value) {
    return categories.find(category => category.category_id == value);
}

export function GetCategoryByName(value) {
    return categories.filter(category => category.category_name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
}

// jobs

export function GetServicesByCategory(value) {
    if(value == null) {
        return services;
    }
    else {
        let posts = services.filter(post => post.category == value);
        return posts;
    }
}

export function GetServicesById(value) {
    return services.find(post => post.id == value);
}

export function GetServicesByUser(value) {
    return services.filter(post => post.owner == value);
}

export function GetOwnerServiceList(value) {
    return createdJobs.filter(job => job.user_id == value);
}

export function GetJobByValue(value){
    let localValue = value.toLowerCase();
    let filterService = services.filter(service => {
        return (
            service.title.toLocaleLowerCase().includes(localValue) ||
            service.secondary.toLocaleLowerCase().includes(localValue)
        )
    })
    return filterService;
}

export const PostService = (value) => {
    let newServices = [...services, value];
    services = newServices;
    let newCreatedJob = {user_id: value.owner, job_id: value.id};
    let newConnections = [...createdJobs, newCreatedJob];
    createdJobs = newConnections;
}

export const UpdateService = (value) => {
    let temp = services.filter(service => service.id != value.id);
    let newServices = [...temp, value];
    services = newServices;
    let newCreatedJob = {user_id: value.owner, job_id: value.id};
    let tempNew = createdJobs.filter(job => job.job_id != value.id);
    let newConnection = [...tempNew, newCreatedJob];
    createdJobs = newConnection;
    console.log(services);
}

export const DeleteService = (id) => {
    let newServices = services.filter(service => service.id != id);
    let newOwner = createdJobs.filter(service => service.job_id != id);
    services = newServices;
    createdJobs = newOwner;
}

export function GetAppliedListByJobId(id) {
    return appliedJobs.filter(service => service.job_id == id);
}

export function GetAppliedListByUserId(id) {
    return appliedJobs.filter(service => service.user_id == id);
}

// users 

export function GetUserByLogin(email) {
    let user = users.find(user => user.email === email);
    return user;
}

export function GetUserById(value) {
    return users.find(user => user.id == value);
}

export function GetContactList(value) {
    let contactList = contacts.filter(contact => contact.user_id == value);
    return contactList;
}

export function GetUsersByValue(value) {
    let localValue = value.toLowerCase();
    let filterUsers = users.filter(user => {
        return(
            user.username.toLocaleLowerCase().includes(localValue) ||
            user.name.toLocaleLowerCase().includes(localValue) ||
            user.lastname.toLocaleLowerCase().includes(localValue) ||
            user.location.toLocaleLowerCase().includes(localValue)
        )
    })
    console.log(filterUsers);
    return filterUsers;
}

// donations

export function GetDonationByValue(value) {
    let localValue = value.toLowerCase();
    let filterDonations = donations.filter(donation => {
        return(
            donation.title.toLocaleLowerCase().includes(localValue) ||
            donation.title.toLocaleLowerCase().includes(localValue)
        )
    })
    return filterDonations;
}

export function GetDonationsByCategory(value) {
    if(value == null) return donations;
    else return donations.filter(donation => donation.category == value);
}

export function GetDonationsById(id) {
    return donations.find(donation => donation.id == id);
}

export function GetOwnerDonationList(id) {
    return createdDonations.filter(donation => donation.user_id == id);
}

export const DeleteDonation = (id) => {
    let newDonations = donations.filter(donation => donation.id != id);
    let newDonationOwner = createdDonations.filter(donation => donation.post_id != id);
    donations = newDonations;
    createdDonations = newDonationOwner;
}