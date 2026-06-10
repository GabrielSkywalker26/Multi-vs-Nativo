import java.time.LocalDate
import java.time.temporal.ChronoUnit
import kotlin.random.Random
import kotlin.system.measureTimeMillis

data class Product(
    val id: String,
    val name: String,
    val price: Double,
    val stock: Int,
    val lastRestockDate: LocalDate
)

fun generateMockProducts(count: Int): List<Product> {
    val names = listOf("Widget", "Gadget", "Thingamajig", "Doohickey", "Gizmo", "Sprocket", "Bolt", "Nut", "Washer", "Spring")
    return (1..count).map { i ->
        Product(
            id = i.toString(),
            name = "${names.random()} #$i",
            price = Random.nextDouble(10.0, 1000.0),
            stock = Random.nextInt(0, 100),
            lastRestockDate = LocalDate.now().minusDays(Random.nextLong(0, 365))
        )
    }
}

fun calculatePriority(product: Product, now: LocalDate): Double {
    val daysSinceRestock = ChronoUnit.DAYS.between(product.lastRestockDate, now).toDouble()
    val priceWeight = 0.4; val stockWeight = 0.4; val dateWeight = 0.2
    val maxPrice = 1000.0; val maxStock = 100.0; val maxDays = 365.0

    val normalizedPrice = (product.price / maxPrice).coerceIn(0.0, 1.0)
    val normalizedStock = (1.0 - (product.stock / maxStock)).coerceIn(0.0, 1.0)
    val normalizedDate = (daysSinceRestock / maxDays).coerceIn(0.0, 1.0)

    return (normalizedPrice * priceWeight) + (normalizedStock * stockWeight) + (normalizedDate * dateWeight)
}

fun main() {
    val count = 50000
    println("Generating $count products...")
    val products = generateMockProducts(count)
    val now = LocalDate.now()

    println("Starting sort benchmark (Kotlin JVM)...")
    var sorted: List<Product>
    val time = measureTimeMillis {
        sorted = products.sortedByDescending { calculatePriority(it, now) }
    }

    println("Sorted $count products in ${time}ms")
    println("Top product: ${sorted[0].name} with priority ${String.format("%.4f", calculatePriority(sorted[0], now))}")
}
