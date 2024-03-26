const express = require("express");
const router = express.Router();
const ShipmentService = require("../services/shipmentService");
const shipmentService = new ShipmentService();

router.get("/user", async (req, res) => {
  const data = await shipmentService.getAllUsers();
  res.send(data);
});

router.post("/user", async (req, res) => {
  const { name, email, phone } = req.body;
  await shipmentService.createUser(name, email, phone);
  res.sendStatus(200);
});

router.get("/user/id", async (req, res) => {
  const { name, phone } = req.query;
  const data = await shipmentService.getUserId(name, phone);
  res.send(data);
});

router.get("/worker", async (req, res) => {
  const data = await shipmentService.getAllWorkers();
  res.send(data);
});

router.post("/worker", async (req, res) => {
  const { name, phone } = req.body;
  await shipmentService.createWorker(name, phone);
  res.sendStatus(200);
});

router.get("/shipment", async (req, res) => {
  const data = await shipmentService.getAllShipments();
  res.send(data);
});

router.post("/shipment", async (req, res) => {
  const { userId, location, content } = req.body;
  await shipmentService.createShipment(userId, location, content);
  res.sendStatus(200);
});

router.delete("/shipment", async (req, res) => {
  const { shipmentId } = req.body;
  await shipmentService.cancelShipment(shipmentId);
  res.sendStatus(200);
});

router.get("/delivery", async (req, res) => {
  const data = await shipmentService.getAllDelivery();
  res.send(data);
});

router.post("/delivery", async (req, res) => {
  const { userId, workerId, shipmentId } = req.body;
  await shipmentService.createDelivery(userId, workerId, shipmentId);
  res.sendStatus(200);
});

router.put("/delivery", async (req, res) => {
  const { userId, workerId, shipmentId, isArrived } = req.query;
  await shipmentService.modifyDelivery(userId, workerId, shipmentId, isArrived);
});

module.exports = router;
