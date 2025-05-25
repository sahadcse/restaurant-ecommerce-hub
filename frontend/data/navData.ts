const navData = {
  // Categories with subcategories for the dropdown menu
  categories: [
    {
      id: "dairy-bakery",
      title: "Dairy & Bakery",
      icon: "cupcake",
      subcategories: [
        {
          title: "Dairy",
          items: [
            { name: "Milk", href: "/shop/dairy/milk" },
            { name: "Ice cream", href: "/shop/dairy/ice-cream" },
            { name: "Cheese", href: "/shop/dairy/cheese" },
            { name: "Frozen custard", href: "/shop/dairy/frozen-custard" },
            { name: "Frozen yogurt", href: "/shop/dairy/frozen-yogurt" },
          ],
        },
        {
          title: "Bakery",
          items: [
            { name: "Cake and Pastry", href: "/shop/bakery/cake-pastry" },
            { name: "Rusk Toast", href: "/shop/bakery/rusk-toast" },
            { name: "Bread & Buns", href: "/shop/bakery/bread-buns" },
            {
              name: "Chocolate Brownie",
              href: "/shop/bakery/chocolate-brownie",
            },
            { name: "Cream Roll", href: "/shop/bakery/cream-roll" },
          ],
        },
      ],
    },
    {
      id: "fruits-vegetable",
      title: "Fruits & Vegetable",
      icon: "apple-whole",
      subcategories: [
        {
          title: "Fruits",
          items: [
            { name: "Apple", href: "/shop/fruits/apple" },
            { name: "Banana", href: "/shop/fruits/banana" },
            { name: "Grapes", href: "/shop/fruits/grapes" },
            { name: "Orange", href: "/shop/fruits/orange" },
            { name: "Strawberry", href: "/shop/fruits/strawberry" },
          ],
        },
        {
          title: "Vegetable",
          items: [
            { name: "Cauliflower", href: "/shop/vegetable/cauliflower" },
            { name: "Bell Peppers", href: "/shop/vegetable/bell-peppers" },
            { name: "Broccoli", href: "/shop/vegetable/broccoli" },
            { name: "Cabbage", href: "/shop/vegetable/cabbage" },
            { name: "Tomato", href: "/shop/vegetable/tomato" },
          ],
        },
      ],
    },
    {
      id: "snack-spice",
      title: "Snack & Spice",
      icon: "popcorn",
      subcategories: [
        {
          title: "Snacks",
          items: [
            { name: "French fries", href: "/shop/snacks/french-fries" },
            { name: "Potato chips", href: "/shop/snacks/potato-chips" },
            {
              name: "Biscuits & Cookies",
              href: "/shop/snacks/biscuits-cookies",
            },
            { name: "Popcorn", href: "/shop/snacks/popcorn" },
            { name: "Rice Cakes", href: "/shop/snacks/rice-cakes" },
          ],
        },
        {
          title: "Spice",
          items: [
            { name: "Cinnamon Powder", href: "/shop/spice/cinnamon-powder" },
            { name: "Cumin Powder", href: "/shop/spice/cumin-powder" },
            { name: "Fenugreek Powder", href: "/shop/spice/fenugreek-powder" },
            { name: "Pepper Powder", href: "/shop/spice/pepper-powder" },
            { name: "Long Pepper", href: "/shop/spice/long-pepper" },
          ],
        },
      ],
    },
    {
      id: "juice-drinks",
      title: "Juice & Drinks",
      icon: "drink-alt",
      subcategories: [
        {
          title: "Juice",
          items: [
            { name: "Mango Juice", href: "/shop/juice/mango-juice" },
            { name: "Coconut Water", href: "/shop/juice/coconut-water" },
            { name: "Tetra Pack", href: "/shop/juice/tetra-pack" },
            { name: "Apple Juices", href: "/shop/juice/apple-juices" },
            { name: "Lychee Juice", href: "/shop/juice/lychee-juice" },
          ],
        },
        {
          title: "Soft Drink",
          items: [
            { name: "Breizh Cola", href: "/shop/soft-drink/breizh-cola" },
            { name: "Green Cola", href: "/shop/soft-drink/green-cola" },
            { name: "Jolt Cola", href: "/shop/soft-drink/jolt-cola" },
            { name: "Mecca Cola", href: "/shop/soft-drink/mecca-cola" },
            { name: "Topsia Cola", href: "/shop/soft-drink/topsia-cola" },
          ],
        },
      ],
    },
  ],

  // Main navigation menu
  mainMenu: [
    {
      title: "Home",
      type: "dropdown",
      items: [
        { name: "Grocery", href: "/" },
        { name: "Fashion", href: "/fashion" },
        { name: "Fashion 2", href: "/fashion-2" },
      ],
    },
    {
      title: "Categories",
      type: "megamenu",
      columns: [
        {
          title: "Classic",
          items: [
            { name: "Left sidebar 3 column", href: "/shop/left-sidebar-col-3" },
            { name: "Left sidebar 4 column", href: "/shop/left-sidebar-col-4" },
            {
              name: "Right sidebar 3 column",
              href: "/shop/right-sidebar-col-3",
            },
            {
              name: "Right sidebar 4 column",
              href: "/shop/right-sidebar-col-4",
            },
            { name: "Full width 4 column", href: "/shop/full-width" },
          ],
        },
        {
          title: "Banner",
          items: [
            {
              name: "Left sidebar 3 column",
              href: "/shop/banner-left-sidebar-col-3",
            },
            {
              name: "Left sidebar 4 column",
              href: "/shop/banner-left-sidebar-col-4",
            },
            {
              name: "Right sidebar 3 column",
              href: "/shop/banner-right-sidebar-col-3",
            },
            {
              name: "Right sidebar 4 column",
              href: "/shop/banner-right-sidebar-col-4",
            },
            { name: "Full width 4 column", href: "/shop/banner-full-width" },
          ],
        },
        {
          title: "Columns",
          items: [
            { name: "3 Columns full width", href: "/shop/full-width-col-3" },
            { name: "4 Columns full width", href: "/shop/full-width-col-4" },
            { name: "5 Columns full width", href: "/shop/full-width-col-5" },
            { name: "6 Columns full width", href: "/shop/full-width-col-6" },
            { name: "Banner 3 Columns", href: "/shop/banner-full-width-col-3" },
          ],
        },
        {
          title: "List",
          items: [
            { name: "Shop left sidebar", href: "/shop/list-left-sidebar" },
            { name: "Shop right sidebar", href: "/shop/list-right-sidebar" },
            {
              name: "Banner left sidebar",
              href: "/shop/list-banner-left-sidebar",
            },
            {
              name: "Banner right sidebar",
              href: "/shop/list-banner-right-sidebar",
            },
            { name: "Full width 2 columns", href: "/shop/list-full-col-2" },
          ],
        },
      ],
    },
    {
      title: "Products",
      type: "dropdown",
      items: [
        {
          name: "Product page",
          type: "submenu",
          items: [
            { name: "Product left sidebar", href: "/product/left-sidebar" },
            { name: "Product right sidebar", href: "/product/right-sidebar" },
          ],
        },
        {
          name: "Product Accordion",
          type: "submenu",
          items: [
            { name: "Left sidebar", href: "/product/accordion-left-sidebar" },
            { name: "Right sidebar", href: "/product/accordion-right-sidebar" },
          ],
        },
        { name: "Product full width", href: "/product/full-width" },
        { name: "Accordion full width", href: "/product/accordion-full-width" },
      ],
    },
    {
      title: "Blog",
      type: "dropdown",
      items: [
        { name: "Left sidebar", href: "/blog/left-sidebar" },
        { name: "Right sidebar", href: "/blog/right-sidebar" },
        { name: "Full Width", href: "/blog/full-width" },
        { name: "Detail left sidebar", href: "/blog/detail-left-sidebar" },
        { name: "Detail right sidebar", href: "/blog/detail-right-sidebar" },
        { name: "Detail Full Width", href: "/blog/detail-full-width" },
      ],
    },
    {
      title: "Pages",
      type: "dropdown",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Cart", href: "/cart" },
        { name: "Checkout", href: "/checkout" },
        { name: "Compare", href: "/compare" },
        { name: "FAQ", href: "/faq" },
        { name: "Login", href: "/login" },
      ],
    },
    {
      title: "Offers",
      type: "link",
      href: "/offers",
      icon: "badge-percent",
    },
  ],

  // Locations
  locations: {
    current: "New York",
    options: [
      { name: "Los Angeles", isCurrent: false },
      { name: "Chicago", isCurrent: false },
      { name: "Houston", isCurrent: false },
      { name: "Phoenix", isCurrent: false },
      { name: "San Diego", isCurrent: false },
    ],
  },
};

export default navData;
