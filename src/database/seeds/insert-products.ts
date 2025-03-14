import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").insert([
    { name: "Hambúrguer Artesanal", price: 25 },
    { name: "Pizza de Calabresa", price: 40 },
    { name: "Sushi Combo", price: 55 },
    { name: "Lasanha de Carne", price: 32 },
    { name: "Salada Caesar", price: 22 },
    { name: "Taco Mexicano", price: 18 },
    { name: "Frango Xadrez", price: 30 },
    { name: "Pastel de Queijo", price: 12 },
    { name: "Macarrão à Bolonhesa", price: 28 },
    { name: "Churrasco Misto", price: 50 },
  ]);
}
