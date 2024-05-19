import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3(1).jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaimg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'

import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");
    const offered = menu.filter(item => item.category === "offered");
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* main cover */}
            <Cover
                img={menuImg}
                title={"our menu"}
                subtitle={"would you like to try a dish"}
            ></Cover>
            <SectionTitle
                subHeading={"Don't miss"}
                heading={"Today's offer"}
            ></SectionTitle>
            {/* offered */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert  item*/}
            <MenuCategory
                items={dessert}
                title={"dessert"}
                img={dessertImg}
                subtitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            ></MenuCategory>
            {/* Pizza item */}
            <MenuCategory
                items={pizza}
                title={"pizza"}
                img={pizzaimg}
                subtitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            ></MenuCategory>
             {/* Salad item */}
            <MenuCategory
                items={salad}
                title={"salad"}
                img={saladImg}
                subtitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            ></MenuCategory>
             {/* soup item */}
            <MenuCategory
                items={soup}
                title={"soup"}
                img={soupImg}
                subtitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            ></MenuCategory>

        </div>
    );
};

export default Menu;