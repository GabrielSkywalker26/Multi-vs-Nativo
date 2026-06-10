package com.example.appcomparativa.data.model

import java.time.LocalDate

/**
 * Data model representing a product in the inventory.
 * 
 * @property id Unique identifier for the product.
 * @property name Name of the product.
 * @property price Unit price of the product.
 * @property stock Current stock level.
 * @property lastRestockDate The date when the product was last restocked.
 */
data class Product(
    val id: String,
    val name: String,
    val price: Double,
    val stock: Int,
    val lastRestockDate: LocalDate
)
