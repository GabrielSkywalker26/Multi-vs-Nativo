package com.example.appcomparativa.navigation

import androidx.navigation3.runtime.NavKey
import kotlinx.serialization.Serializable

@Serializable
sealed interface Destination : NavKey {
    @Serializable
    data class ProductList(val name: String = "list") : Destination

    @Serializable
    data class ProductDetail(val productId: String) : Destination
}
