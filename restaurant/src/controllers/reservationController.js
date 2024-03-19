const express = require("express");
const ReservationService = require("../services/reservationService");
const reservationService = new ReservationService();
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await reservationService.getAllRestaurants();
  res.render("C:\\files\\codes\\main\\mvc\\restaurant\\src\\views\\index.ejs", {
    data,
  });
});

router.post("/", async (req, res) => {
  if (!req.body) res.redirect("/manage_reservation");
  const { restaurant_id, name, email, phone, num_guests, date } = req.body;
  await reservationService.createUser(name, email, phone);
  await reservationService.createReservation(
    name,
    restaurant_id,
    num_guests,
    date,
  );
  res.redirect(`/manage_reservation?name=${name}`);
});

router.get("/manage_reservation", async (req, res) => {
  const { name } = req.query;
  const data = name
    ? await reservationService.getAllSelectedReservations(name)
    : await reservationService.getAllReservations();
  res.render("../views/manage_reservation", { data });
});

router.get("/cancel_reservation/:id", async (req, res) => {
  const { name } = req.query;
  const { id } = req.params;
  await reservationService.deleteUser(id);
  res.redirect(`/manage_reservation?name=${name}`);
});

module.exports = router;
