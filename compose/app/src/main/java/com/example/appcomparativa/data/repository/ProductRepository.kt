package com.example.appcomparativa.data.repository

import com.example.appcomparativa.data.model.Product
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import kotlin.random.Random

/**
 * Repository responsible for managing product data and performing heavy-duty sorting.
 */
class ProductRepository {

    private val products = mutableListOf<Product>()

    init {
        generateMockProducts(5000)
    }

    /**
     * Generates a large number of mock products for testing performance.
     */
    private fun generateMockProducts(count: Int) {
        val names = listOf("Widget", "Gadget", "Thingamajig", "Doohickey", "Gizmo", "Sprocket", "Bolt", "Nut", "Washer", "Spring")
        for (i in 1..count) {
            products.add(
                Product(
                    id = i.toString(),
                    name = "${names.random()} #$i",
                    price = Random.nextDouble(10.0, 1000.0),
                    stock = Random.nextInt(0, 100),
                    lastRestockDate = LocalDate.now().minusDays(Random.nextLong(0, 365))
                )
            )
        }
    }

    /**
     * Returns all products.
     */
    fun getAllProducts(): List<Product> = products

    /**
     * Performs a heavy-duty sorting of products based on 'Restock Priority'.
     * Uses Coroutines to ensure the operation is non-blocking.
     */
    suspend fun getProductsSortedByPriority(): List<Product> = withContext(Dispatchers.Default) {
        val now = LocalDate.now()
        
        // Sorting logic: Restock Priority
        // Higher price = higher priority
        // Lower stock = higher priority
        // Older restock date = higher priority
        products.sortedByDescending { product ->
            calculatePriority(product, now)
        }
    }

    /**
     * Calculates the restock priority score for a given product.
     */
    private fun calculatePriority(product: Product, now: LocalDate): Double {
        val daysSinceRestock = ChronoUnit.DAYS.between(product.lastRestockDate, now).toDouble()
        
        // Weights for priority calculation
        val priceWeight = 0.4
        val stockWeight = 0.4
        val dateWeight = 0.2
        
        // Normalization (assuming max values for mock data)
        val maxPrice = 1000.0
        val maxStock = 100.0
        val maxDays = 365.0
        
        val normalizedPrice = (product.price / maxPrice).coerceIn(0.0, 1.0)
        val normalizedStock = (1.0 - (product.stock / maxStock)).coerceIn(0.0, 1.0)
        val normalizedDate = (daysSinceRestock / maxDays).coerceIn(0.0, 1.0)
        
        return (normalizedPrice * priceWeight) + (normalizedStock * stockWeight) + (normalizedDate * dateWeight)
    }

    /**
     * Searches products by name locally.
     */
    suspend fun searchProducts(query: String): List<Product> = withContext(Dispatchers.Default) {
        if (query.isBlank()) {
            products
        } else {
            products.filter { it.name.contains(query, ignoreCase = true) }
        }
    }
}
