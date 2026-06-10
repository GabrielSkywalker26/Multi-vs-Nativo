package com.example.appcomparativa

import android.app.Application
import com.example.appcomparativa.service.StockSyncWorker

class InventoryApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        StockSyncWorker.schedule(this)
    }
}
