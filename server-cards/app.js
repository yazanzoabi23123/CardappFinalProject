const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid"); // import uuidv4 function from the uuid package

const app = express();
app.use(cors({ origin: "*" }));
const key = "secret";
app.use(express.json());

const cards = [
  {
    _id: "eafeswfwr2326346tf3254f",
    title: "first",
    subtitle: "subTitle",
    description: "testing",
    phone: "050-1111111",
    email: "text@text.com",
    web: "https://www.test.co.il",
    image: {
      url: "assets/images/business-card-top-image.jpg",
      alt: "image",
    },
    address: {
      state: "TLV",
      country: "Israerl",
      street: "Dizingof",
      houseNumber: 1,
      city: "Tel Aviv",
      zip: 1312,
    },
    bizNumber: 1111111,
    likes: [],
    user_id: "4235234234mfnjrb2h3vbry23",
  },
  {
    _id: "daslfjhbasfjba123124123",
    title: "second",
    subtitle: "subTitle",
    description: "testing",
    phone: "050-1111111",
    email: "text@text.com",
    web: "https://www.test.co.il",
    image: {
      url: "assets/images/business-card-top-image.jpg",
      alt: "image",
    },
    address: {
      state: "TLV",
      country: "Israerl",
      street: "Dizingof",
      houseNumber: 2,
      city: "Tel Aviv",
      zip: 1312,
    },
    bizNumber: 222222,
    likes: [],
    user_id: "4235234234mfnjrb2h3vbry23",
  },
  {
    _id: "asdfaa54sdf158as4ass",
    title: "third",
    subtitle: "subTitle",
    description: "testing",
    phone: "050-1111111",
    email: "text@text.com",
    web: "https://www.test.co.il",
    image: {
      url: "assets/images/business-card-top-image.jpg",
      alt: "image",
    },
    address: {
      state: "TLV",
      country: "Israerl",
      street: "Dizingof",
      houseNumber: 3,
      city: "Tel Aviv",
      zip: 1312,
    },
    bizNumber: 333333,
    likes: [],
    user_id: "4235234234mfnjasdasdry23",
  },
];

const users = [
  {
    name: {
      first: "Tzach",
      middle: "",
      last: "Dabush",
    },
    phone: "055-5555555",
    email: "admin@admin.com",
    password: "Abc123!",
    address: {
      state: "Haifa",
      country: "Israel",
      city: "Haifa",
      street: "HaNasi",
      zip: 123456,
      houseNumber: 12,
    },
    image: {
      url: "www.example.com",
      alt: "profile image",
    },
    isBusiness: true,
    isAdmin: true,
    user_id: "4235234234mfnjrb2h3vbry23",
  },
  {
    name: {
      first: "Tzach1",
      middle: "",
      last: "Dabush1",
    },
    phone: "055-5555555",
    email: "admin1@admin.com",
    password: "Abc123!",
    address: {
      state: "Haifa",
      country: "Israel",
      city: "Haifa",
      street: "HaNasi",
      zip: 123456,
      houseNumber: 12,
    },
    image: {
      url: "www.example.com",
      alt: "profile image",
    },
    isBusiness: true,
    isAdmin: false,
    user_id: "4235234234mfnjasdasdry23",
  },
];
const verifyToken = (tokenFromClient) => {
  try {
    const userDataFromPayload = jwt.verify(tokenFromClient, key);
    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};

app.get("/cards", (req, res) => {
  //res.status(404).send("Page not found"); //error
  //setTimeout(() => res.json(cards), 3000); //loading
  res.json(cards);
});

app.get("/cards/my-cards", (req, res) => {
  const tokenFromClient = req.header("x-auth-token");
  if (tokenFromClient) {
    const userData = verifyToken(tokenFromClient);
    const user_id = userData.id; // Assume user_id is passed as a parameter in the body
    const userCards = cards.filter((c) => c.user_id === user_id);
    res.json(userCards);
  } else {
    res.status(404).send("login first");
  }
});

app.get("/cards/:cardId", (req, res) => {
  const cardId = req.params.cardId;
  const card = cards.find((card) => card._id === cardId);
  if (!card) {
    res.status(404).json({ error: "Card not found" });
  } else {
    res.json(card);
  }
});

function generateBizNumber() {
  const random = Math.floor(Math.random() * 10_000_000);
  const card = cards.find((card) => card.bizNumber == random);
  if (card) generateBizNumber();
  return random;
}

app.post("/cards", (req, res) => {
  // Add a new ID to the card object
  const newId = Date.now().toString();

  const newCardWithId = {
    ...req.body,
    bizNumber: generateBizNumber(),
    _id: newId,
  };

  // Add the new card to the cards array
  cards.push(newCardWithId);

  // Send the new card object back to the client
  res.json(newCardWithId);
});

app.put("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex((c) => c._id === req.params.id);
  if (cardIndex === -1) {
    res.status(404).send("Card not found");
  } else {
    const updatedCard = {
      ...cards[cardIndex],
      ...req.body,
      _id: req.params.id,
    };
    cards[cardIndex] = updatedCard;
    res.json(updatedCard);
  }
});

app.patch("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex((c) => c._id === req.params.id);
  if (cardIndex === -1) {
    res.status(404).send("Card not found");
  } else {
    const tokenFromClient = req.header("x-auth-token");
    if (tokenFromClient) {
      const userData = verifyToken(tokenFromClient);
      const user_id = userData.id;
      const card = cards[cardIndex];
      const userLiked = card.likes.includes(user_id);
      const updatedLikes = userLiked
        ? card.likes.filter((id) => id !== user_id)
        : [...card.likes, user_id];
      const updatedCard = { ...card, likes: updatedLikes };
      cards[cardIndex] = updatedCard;
      console.log(updatedCard);
      res.json(updatedCard);
    } else {
      res.status(404).send("Log in first");
    }
  }
});

app.delete("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex((c) => c._id === req.params.id);
  if (cardIndex === -1) {
    res.status(404).send("Card not found");
  } else {
    const deletedCard = cards.splice(cardIndex, 1)[0];
    res.json(deletedCard);
  }
});

app.post("/users/login", (req, res) => {
  console.log(req.body);
  //const tokenFromClient = req.header("x-auth-token");
  // if (tokenFromClient) {
  //   const userData = verifyToken(tokenFromClient);
  //   if (userData) {
  //     // User is already logged in, so send back the same token
  //     res.send(tokenFromClient);
  //     return;
  //   }
  // }

  // User is not logged in, so check if the email and password are valid
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    // User not found or password incorrect
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // User found, so generate a new token and send it back
  const userDataForToken = {
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
    firstName: user.name.first,
    id: user.user_id,
  };
  const token = jwt.sign(userDataForToken, key);
  res.send(token);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.user_id = uuidv4(); // generate a new UUID and add it to the newUser object
  users.push(newUser);
  res.status(201).send({ message: "User added successfully." });
});

app.get("/user", (req, res) => {
  const tokenFromClient = req.header("x-auth-token");
  if (tokenFromClient) {
    const userData = verifyToken(tokenFromClient);
    const user_id = userData.id;
    let userFullData = users.find((user) => user.user_id == user_id);
    userFullData = { ...userFullData, password: "" };
    res.send(userFullData);
  } else {
    res.status(401).send("log in first");
  }
});

const PORT = 8181;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
app.put("/users", (req, res) => {
  const tokenFromClient = req.header("x-auth-token");
  const userData = verifyToken(tokenFromClient);
  if (userData) {
    const updatedUser = req.body;
    const index = users.findIndex((user) => user.user_id == userData.id);
    if (index != -1) {
      users[index] = updatedUser;
      res.status(201).send({ message: "User updated successfully." });
    } else {
      res.send(404).send("user not found");
    }
  } else {
    res.status(401).send("log in first");
  }
});