const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
const port = 3000;

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/data", async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/data", async (req, res) => {
  try {
    const newDoc = req.body;
    const docRef = await db.collection("tasks").add(newDoc);
    res.status(201).json({ id: docRef.id, ...newDoc });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/data/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("tasks").doc(id).delete();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/data/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = req.body;
    await db.collection("tasks").doc(id).update(updatedTask);
    const task = await db.collection("tasks").doc(id).get();
    res.status(200).json({ id: task.id, ...task.data() });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
