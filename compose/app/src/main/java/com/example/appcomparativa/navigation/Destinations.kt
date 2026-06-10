package com.example.appcomparativa.navigation

import androidx.navigation3.runtime.NavKey
import kotlinx.serialization.Serializable

sealed interface Destination : NavKey {
    @Serializable
    data object ProductList : Destination

    @Serializable
    data class ProductDetail(val productId: String) : Destination
}
