package com.example.appcomparativa

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.material3.adaptive.ExperimentalMaterial3AdaptiveApi
import androidx.compose.material3.adaptive.currentWindowAdaptiveInfo
import androidx.compose.material3.adaptive.layout.calculatePaneScaffoldDirective
import androidx.compose.material3.adaptive.navigation3.ListDetailSceneStrategy
import androidx.compose.material3.adaptive.navigation3.rememberListDetailSceneStrategy
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation3.runtime.NavKey
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.runtime.rememberNavBackStack
import androidx.navigation3.scene.SinglePaneSceneStrategy
import androidx.navigation3.ui.NavDisplay
import com.example.appcomparativa.navigation.Destination
import com.example.appcomparativa.ui.screens.ProductDetailScreen
import com.example.appcomparativa.ui.screens.ProductListScreen
import com.example.appcomparativa.ui.theme.APPCOMPARATIVATheme
import com.example.appcomparativa.ui.viewmodel.InventoryViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            APPCOMPARATIVATheme {
                MainNavigation()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3AdaptiveApi::class)
@Composable
fun MainNavigation() {
    val viewModel: InventoryViewModel = viewModel()
    val backStack = rememberNavBackStack(Destination.ProductList() as NavKey)

    val windowAdaptiveInfo = currentWindowAdaptiveInfo()
    val directive = remember(windowAdaptiveInfo) {
        calculatePaneScaffoldDirective(windowAdaptiveInfo)
            .copy(horizontalPartitionSpacerSize = 0.dp)
    }
    val listDetailStrategy = rememberListDetailSceneStrategy<NavKey>(directive = directive)
    val combinedStrategy = remember(listDetailStrategy) {
        listDetailStrategy then SinglePaneSceneStrategy()
    }

    NavDisplay(
        backStack = backStack,
        onBack = { backStack.removeAt(backStack.size - 1) },
        sceneStrategy = combinedStrategy,
        entryProvider = entryProvider {
            entry<Destination.ProductList>(
                metadata = ListDetailSceneStrategy.listPane(),
            ) {
                ProductListScreen(
                    viewModel = viewModel
                ) { product ->
                    backStack.add(Destination.ProductDetail(product.id))
                }
            }
            entry<Destination.ProductDetail>(
                metadata = ListDetailSceneStrategy.detailPane()
            ) { key ->
                val product = remember(key.productId) {
                    viewModel.getProductById(key.productId)
                }
                ProductDetailScreen(
                    product = product,
                    onBackClick = { backStack.removeAt(backStack.size - 1) }
                )
            }
        }
    )
}
