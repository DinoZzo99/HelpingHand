import React from "react";
import categories from "../mockupData/category.json";
import posts from "../mockupData/service.json";
import users from "../mockupData/user.json";
import createdJobs from "../mockupData/created.json";
import contacts from "../mockupData/contacts.json";

function FakeBackend() {

    return(
        <p>Everything is working fine</p>
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

// jobs

export function GetServicesByCategory(value) {
    if(value == null) {
        return posts;
    }
    else {
        let services = posts.filter(post => post.category == value);
        return services;
    }
}

export function GetServicesById(value) {
    return posts.find(post => post.id == value);
}

export function GetServicesByUser(value) {
    return posts.filter(post => post.owner == value);
}

// users 

export function GetUserById(value) {
    return users.find(user => user.id == value);
}

export function GetContactList(value) {
    let contactList = contacts.filter(contact => contact.user_id == value);
    return contactList;
}