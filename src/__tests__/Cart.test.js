import Product from "../components/Product"
import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import CartTest from "../__tests__/Cart.test.js"
import axios from "../../node_modules/axios/index";
import placeHolder from "../assets/placeholder.png"



jest.mockimport;

describe('AddToCart', () => {
  
    test("adds an item to the shopping cart", () => {

        const mockResponse = { data: [{ id=1, title: 'test', price: 5, description: "Testing Description", quanity: 5, image: placeHolder, category: 'Test', rating: 5, ratingCount: 200 }] };
        const { getByText } = render(<Product productid={mockResponse.data.id} title={mockResponse.data.title} imageSrc={mockResponse.data.image} price={mockResponse.data.price} category={mockResponse.data.category} description={mockResponse.data.description} key={mockResponse.data.id} rating={mockResponse.data.rating} ratingCount={mockResponse.data.ratingCount} />);
        const el = getByText("Add To Cart");
        fireEvent.click(el);
        
    })

})