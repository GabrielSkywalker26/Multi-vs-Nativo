package com.example.appcomparativa.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.appcomparativa.data.model.Product
import com.example.appcomparativa.data.repository.ProductRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class InventoryViewModel(
    private val repository: ProductRepository = ProductRepository()
) : ViewModel() {

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _isSorting = MutableStateFlow(false)
    val isSorting: StateFlow<Boolean> = _isSorting.asStateFlow()

    private val _products = MutableStateFlow<List<Product>>(emptyList())
    
    val filteredProducts: StateFlow<List<Product>> = combine(_products, _searchQuery) { products, query ->
        if (query.isBlank()) {
            products
        } else {
            products.filter { it.name.contains(query, ignoreCase = true) }
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    init {
        loadProducts()
    }

    fun loadProducts() {
        viewModelScope.launch {
            _isSorting.value = true
            _products.value = repository.getProductsSortedByPriority()
            _isSorting.value = false
        }
    }

    fun onSearchQueryChange(newQuery: String) {
        _searchQuery.value = newQuery
    }
    
    fun getProductById(id: String): Product? {
        return _products.value.find { it.id == id }
    }
}
