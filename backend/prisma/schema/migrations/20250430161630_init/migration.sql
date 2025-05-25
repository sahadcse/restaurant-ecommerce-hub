-- CreateEnum
CREATE TYPE "blog_post_status" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('PENDING', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "order_type" AS ENUM ('DELIVERY', 'PICKUP', 'DINE_IN');

-- CreateEnum
CREATE TYPE "delivery_status" AS ENUM ('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'FAILED');

-- CreateEnum
CREATE TYPE "payment_method" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'STRIPE', 'CASH', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "return_status" AS ENUM ('NONE', 'REQUESTED', 'APPROVED', 'REJECTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "priority_level" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('CUSTOMER', 'RESTAURANT_OWNER', 'RESTAURANT_STAFF', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "account_status" AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION');

-- CreateEnum
CREATE TYPE "feedback_type" AS ENUM ('RESTAURANT', 'DELIVERY', 'MENU_ITEM', 'SERVICE');

-- CreateEnum
CREATE TYPE "notification_channel" AS ENUM ('EMAIL', 'SMS', 'PUSH', 'IN_APP');

-- CreateEnum
CREATE TYPE "notification_type" AS ENUM ('ORDER_STATUS', 'PROMOTION', 'PASSWORD_RESET', 'ACCOUNT_UPDATE', 'NEW_MESSAGE', 'SYSTEM_ALERT');

-- CreateEnum
CREATE TYPE "promotion_type" AS ENUM ('BANNER', 'EMAIL', 'DISCOUNT', 'SOCIAL');

-- CreateEnum
CREATE TYPE "weight_unit" AS ENUM ('GRAM', 'KILOGRAM', 'OUNCE', 'POUND');

-- CreateEnum
CREATE TYPE "inventory_status" AS ENUM ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'DISCONTINUED');

-- CreateEnum
CREATE TYPE "recommendation_reason" AS ENUM ('POPULAR', 'FREQUENTLY_BOUGHT_TOGETHER', 'AI_SUGGESTED', 'MANUAL');

-- CreateEnum
CREATE TYPE "loyalty_transaction_type" AS ENUM ('EARNED', 'REDEEMED', 'EXPIRED', 'ADJUSTED');

-- CreateEnum
CREATE TYPE "order_cancellation_status" AS ENUM ('REQUESTED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "slider_link_type" AS ENUM ('RESTAURANT', 'MENU_ITEM', 'CATEGORY', 'CAMPAIGN', 'EXTERNAL_URL', 'NONE');

-- CreateEnum
CREATE TYPE "support_ticket_status" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'WAITING_FOR_CUSTOMER', 'WAITING_FOR_SUPPORT');

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "event_type" TEXT NOT NULL,
    "session_id" UUID,
    "payload" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_queries" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "query" TEXT NOT NULL,
    "results_count" INTEGER NOT NULL,
    "filters" JSONB,
    "session_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "search_queries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "image_url" TEXT,
    "status" "blog_post_status" NOT NULL DEFAULT 'DRAFT',
    "published_at" TIMESTAMP(3),
    "author_id" UUID NOT NULL,
    "category_id" UUID,
    "views" INTEGER NOT NULL DEFAULT 0,
    "allow_comments" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "blog_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts_on_tags" (
    "post_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_posts_on_tags_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "blog_comments" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "parent_id" UUID,
    "is_approved" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "blog_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" UUID NOT NULL,
    "cart_id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "variant_id" UUID,
    "quantity" INTEGER NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hero_sliders" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "button_text" TEXT,
    "link_url" TEXT,
    "link_type" "slider_link_type" NOT NULL DEFAULT 'NONE',
    "link_target_id" UUID,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "hero_sliders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deal_sections" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "timer_days" INTEGER,
    "timer_hours" INTEGER,
    "timer_minutes" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "deal_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image_url" TEXT,
    "hurry_text" TEXT,
    "button_text" TEXT,
    "button_link" TEXT,
    "link_type" "slider_link_type",
    "link_target_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_banners" (
    "id" UUID NOT NULL,
    "discount" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "button_text" TEXT NOT NULL,
    "button_link" TEXT NOT NULL,
    "link_type" "slider_link_type",
    "link_target_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "offer_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "new_arrivals_sections" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "new_arrivals_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "new_arrivals_tabs" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "section_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "new_arrivals_tabs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_sections" (
    "id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "offer_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_section_banners" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "button_text" TEXT NOT NULL,
    "button_link" TEXT NOT NULL,
    "offer_section_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "offer_section_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sliders" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "offer_section_id" UUID NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID,

    CONSTRAINT "sliders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items_on_sliders" (
    "menu_item_id" UUID NOT NULL,
    "slider_id" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER,

    CONSTRAINT "menu_items_on_sliders_pkey" PRIMARY KEY ("menu_item_id","slider_id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "restaurant_page_url" TEXT,
    "product_count" INTEGER NOT NULL,
    "sales_count" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "timezone" TEXT NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "location" JSONB NOT NULL,
    "business_hours" JSONB NOT NULL,
    "brand_id" UUID,
    "theme" JSONB,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating_count" INTEGER NOT NULL DEFAULT 0,
    "delivery_fee_structure" JSONB,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "description" TEXT,
    "website_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "parent_id" UUID,
    "discount_percentage" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "final_price" DOUBLE PRECISION NOT NULL,
    "mrp" DOUBLE PRECISION NOT NULL,
    "discount_percentage" DOUBLE PRECISION NOT NULL,
    "stock_status" "inventory_status" NOT NULL DEFAULT 'IN_STOCK',
    "rating" DOUBLE PRECISION NOT NULL,
    "rating_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "category_id" UUID NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "last_updated_by" UUID NOT NULL,
    "availability_schedule" JSONB,
    "prep_time" INTEGER,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "max_order_quantity" INTEGER,
    "min_order_quantity" INTEGER NOT NULL DEFAULT 1,
    "allergens" JSONB,
    "nutrition_info" JSONB,
    "tenant_id" UUID NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "brand_id" UUID,
    "color" TEXT,
    "weightUnit" "weight_unit" NOT NULL,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "search_keywords" JSONB,
    "tax_rate_id" UUID,
    "dietary_label" TEXT,
    "quantity_label" TEXT,
    "flags" TEXT[],
    "deal_section_id" UUID,
    "new_arrivals_section_id" UUID,
    "tab_id" UUID,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_audits" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,

    CONSTRAINT "menu_item_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_variants" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "weight" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_item_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_images" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alt_text" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "menu_item_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_specifications" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "spec_key" TEXT NOT NULL,
    "spec_value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_item_specifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_attributes" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "language" VARCHAR(2),

    CONSTRAINT "menu_item_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_price_history" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "variant_id" UUID,
    "final_price" DOUBLE PRECISION NOT NULL,
    "mrp" DOUBLE PRECISION NOT NULL,
    "discount_percentage" DOUBLE PRECISION NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_item_price_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_reviews" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_image_url" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_item_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "related_menu_items" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "related_item_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "related_menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items_on_menus" (
    "menu_item_id" UUID NOT NULL,
    "menu_id" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER,

    CONSTRAINT "menu_items_on_menus_pkey" PRIMARY KEY ("menu_item_id","menu_id")
);

-- CreateTable
CREATE TABLE "menu_item_recommendations" (
    "id" UUID NOT NULL,
    "source_menu_item_id" UUID NOT NULL,
    "target_menu_item_id" UUID NOT NULL,
    "reason" "recommendation_reason" NOT NULL,
    "score" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_item_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "status" "order_status" NOT NULL DEFAULT 'PENDING',
    "payment_status" "payment_status" NOT NULL DEFAULT 'PENDING',
    "subtotal" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "delivery_fee" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "delivery_address" JSONB,
    "estimated_delivery_time" TIMESTAMP(3),
    "actual_delivery_time" TIMESTAMP(3),
    "cancel_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order_type" "order_type" NOT NULL DEFAULT 'DELIVERY',
    "delivery_instructions" TEXT,
    "source" TEXT,
    "priority" "priority_level",
    "correlation_id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_audits" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" UUID NOT NULL,
    "changes" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "method" "payment_method" NOT NULL,
    "status" "payment_status" NOT NULL,
    "transaction_id" TEXT,
    "gateway_response" JSONB,
    "refund_status" "return_status",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "driver_id" UUID,
    "status" "delivery_status" NOT NULL,
    "tracking_url" TEXT,
    "assigned_at" TIMESTAMP(3),
    "picked_up_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "tenant_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "vehicle_info" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_cancellations" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "requested_by" UUID NOT NULL,
    "approved_by" UUID,
    "status" "order_cancellation_status" NOT NULL DEFAULT 'REQUESTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_cancellations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergens" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "allergens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_allergens" (
    "menu_item_id" UUID NOT NULL,
    "allergen_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_item_allergens_pkey" PRIMARY KEY ("menu_item_id","allergen_id")
);

-- CreateTable
CREATE TABLE "tax_rates" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "region" TEXT,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "restaurant_id" UUID,
    "tenant_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "variant_id" UUID,
    "quantity" INTEGER NOT NULL,
    "reorder_threshold" INTEGER NOT NULL,
    "status" "inventory_status" NOT NULL DEFAULT 'IN_STOCK',
    "last_updated" TIMESTAMP(3) NOT NULL,
    "supplier_id" UUID,
    "restaurant_id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "location" TEXT,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loyalty_programs" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "points_per_dollar" DOUBLE PRECISION NOT NULL,
    "reward_threshold" INTEGER NOT NULL,
    "reward_type" TEXT NOT NULL,
    "reward_value" DOUBLE PRECISION,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "valid_from" TIMESTAMP(3),
    "valid_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "loyalty_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loyalty_transactions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "order_id" UUID,
    "program_id" UUID NOT NULL,
    "points_change" INTEGER NOT NULL,
    "transactionType" "loyalty_transaction_type" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loyalty_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "notification_type" NOT NULL,
    "channel" "notification_channel" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "feedback_type" NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role" "user_role" NOT NULL,
    "permission_id" UUID NOT NULL,
    "granted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role","permission_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "refresh_token" TEXT,
    "ip_address" TEXT,
    "device_info" JSONB,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_tickets" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "order_id" UUID,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "support_ticket_status" NOT NULL DEFAULT 'OPEN',
    "priority" "priority_level" NOT NULL DEFAULT 'NORMAL',
    "assigned_to" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "resolved_at" TIMESTAMP(3),
    "closed_at" TIMESTAMP(3),
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "support_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_responses" (
    "id" UUID NOT NULL,
    "ticket_id" UUID NOT NULL,
    "responder_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "is_internal" BOOLEAN NOT NULL DEFAULT false,
    "attachments" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "support_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "user_role" NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_number" TEXT,
    "language" VARCHAR(2),
    "timezone" TEXT,
    "two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
    "two_factor_secret" TEXT,
    "failed_login_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "account_status" "account_status" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "privacy_consent" BOOLEAN NOT NULL DEFAULT false,
    "consent_given_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "attributes" JSONB,
    "default_currency" VARCHAR(3),
    "last_activity_at" TIMESTAMP(3),
    "loyalty_points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_audits" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" UUID,
    "changes" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "label" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" UUID NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlists" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuItemTags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_MenuItemTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "analytics_events_event_type_idx" ON "analytics_events"("event_type");

-- CreateIndex
CREATE INDEX "analytics_events_timestamp_idx" ON "analytics_events"("timestamp");

-- CreateIndex
CREATE INDEX "analytics_events_user_id_idx" ON "analytics_events"("user_id");

-- CreateIndex
CREATE INDEX "analytics_events_session_id_idx" ON "analytics_events"("session_id");

-- CreateIndex
CREATE INDEX "analytics_events_tenant_id_idx" ON "analytics_events"("tenant_id");

-- CreateIndex
CREATE INDEX "search_queries_user_id_idx" ON "search_queries"("user_id");

-- CreateIndex
CREATE INDEX "search_queries_session_id_idx" ON "search_queries"("session_id");

-- CreateIndex
CREATE INDEX "search_queries_created_at_idx" ON "search_queries"("created_at");

-- CreateIndex
CREATE INDEX "search_queries_tenant_id_idx" ON "search_queries"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_name_key" ON "blog_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_slug_key" ON "blog_categories"("slug");

-- CreateIndex
CREATE INDEX "blog_categories_tenant_id_idx" ON "blog_categories"("tenant_id");

-- CreateIndex
CREATE INDEX "blog_categories_slug_idx" ON "blog_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_author_id_idx" ON "blog_posts"("author_id");

-- CreateIndex
CREATE INDEX "blog_posts_category_id_idx" ON "blog_posts"("category_id");

-- CreateIndex
CREATE INDEX "blog_posts_status_idx" ON "blog_posts"("status");

-- CreateIndex
CREATE INDEX "blog_posts_published_at_idx" ON "blog_posts"("published_at");

-- CreateIndex
CREATE INDEX "blog_posts_tenant_id_idx" ON "blog_posts"("tenant_id");

-- CreateIndex
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts"("created_at");

-- CreateIndex
CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "blog_tags_name_key" ON "blog_tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "blog_tags_slug_key" ON "blog_tags"("slug");

-- CreateIndex
CREATE INDEX "blog_tags_tenant_id_idx" ON "blog_tags"("tenant_id");

-- CreateIndex
CREATE INDEX "blog_tags_slug_idx" ON "blog_tags"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_on_tags_tag_id_idx" ON "blog_posts_on_tags"("tag_id");

-- CreateIndex
CREATE INDEX "blog_comments_post_id_idx" ON "blog_comments"("post_id");

-- CreateIndex
CREATE INDEX "blog_comments_author_id_idx" ON "blog_comments"("author_id");

-- CreateIndex
CREATE INDEX "blog_comments_parent_id_idx" ON "blog_comments"("parent_id");

-- CreateIndex
CREATE INDEX "blog_comments_is_approved_idx" ON "blog_comments"("is_approved");

-- CreateIndex
CREATE INDEX "blog_comments_tenant_id_idx" ON "blog_comments"("tenant_id");

-- CreateIndex
CREATE INDEX "blog_comments_created_at_idx" ON "blog_comments"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "carts_user_id_key" ON "carts"("user_id");

-- CreateIndex
CREATE INDEX "carts_user_id_idx" ON "carts"("user_id");

-- CreateIndex
CREATE INDEX "carts_tenant_id_idx" ON "carts"("tenant_id");

-- CreateIndex
CREATE INDEX "carts_updated_at_idx" ON "carts"("updated_at");

-- CreateIndex
CREATE INDEX "cart_items_cart_id_idx" ON "cart_items"("cart_id");

-- CreateIndex
CREATE INDEX "cart_items_menu_item_id_idx" ON "cart_items"("menu_item_id");

-- CreateIndex
CREATE INDEX "cart_items_variant_id_idx" ON "cart_items"("variant_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cart_id_menu_item_id_variant_id_key" ON "cart_items"("cart_id", "menu_item_id", "variant_id");

-- CreateIndex
CREATE INDEX "hero_sliders_is_active_idx" ON "hero_sliders"("is_active");

-- CreateIndex
CREATE INDEX "hero_sliders_display_order_idx" ON "hero_sliders"("display_order");

-- CreateIndex
CREATE INDEX "hero_sliders_tenant_id_idx" ON "hero_sliders"("tenant_id");

-- CreateIndex
CREATE INDEX "hero_sliders_start_date_end_date_idx" ON "hero_sliders"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "hero_sliders_link_type_idx" ON "hero_sliders"("link_type");

-- CreateIndex
CREATE INDEX "hero_sliders_updated_at_idx" ON "hero_sliders"("updated_at");

-- CreateIndex
CREATE INDEX "deal_sections_is_active_idx" ON "deal_sections"("is_active");

-- CreateIndex
CREATE INDEX "deal_sections_tenant_id_idx" ON "deal_sections"("tenant_id");

-- CreateIndex
CREATE INDEX "deal_sections_start_date_end_date_idx" ON "deal_sections"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "deal_sections_updated_at_idx" ON "deal_sections"("updated_at");

-- CreateIndex
CREATE INDEX "banners_is_active_idx" ON "banners"("is_active");

-- CreateIndex
CREATE INDEX "banners_tenant_id_idx" ON "banners"("tenant_id");

-- CreateIndex
CREATE INDEX "banners_start_date_end_date_idx" ON "banners"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "banners_link_type_idx" ON "banners"("link_type");

-- CreateIndex
CREATE INDEX "banners_updated_at_idx" ON "banners"("updated_at");

-- CreateIndex
CREATE INDEX "offer_banners_is_active_idx" ON "offer_banners"("is_active");

-- CreateIndex
CREATE INDEX "offer_banners_tenant_id_idx" ON "offer_banners"("tenant_id");

-- CreateIndex
CREATE INDEX "offer_banners_start_date_end_date_idx" ON "offer_banners"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "offer_banners_link_type_idx" ON "offer_banners"("link_type");

-- CreateIndex
CREATE INDEX "offer_banners_updated_at_idx" ON "offer_banners"("updated_at");

-- CreateIndex
CREATE INDEX "new_arrivals_sections_is_active_idx" ON "new_arrivals_sections"("is_active");

-- CreateIndex
CREATE INDEX "new_arrivals_sections_tenant_id_idx" ON "new_arrivals_sections"("tenant_id");

-- CreateIndex
CREATE INDEX "new_arrivals_sections_updated_at_idx" ON "new_arrivals_sections"("updated_at");

-- CreateIndex
CREATE INDEX "new_arrivals_tabs_section_id_idx" ON "new_arrivals_tabs"("section_id");

-- CreateIndex
CREATE INDEX "new_arrivals_tabs_is_active_idx" ON "new_arrivals_tabs"("is_active");

-- CreateIndex
CREATE INDEX "new_arrivals_tabs_tenant_id_idx" ON "new_arrivals_tabs"("tenant_id");

-- CreateIndex
CREATE INDEX "new_arrivals_tabs_order_idx" ON "new_arrivals_tabs"("order");

-- CreateIndex
CREATE INDEX "new_arrivals_tabs_name_idx" ON "new_arrivals_tabs"("name");

-- CreateIndex
CREATE INDEX "offer_sections_is_active_idx" ON "offer_sections"("is_active");

-- CreateIndex
CREATE INDEX "offer_sections_tenant_id_idx" ON "offer_sections"("tenant_id");

-- CreateIndex
CREATE INDEX "offer_sections_updated_at_idx" ON "offer_sections"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "offer_section_banners_offer_section_id_key" ON "offer_section_banners"("offer_section_id");

-- CreateIndex
CREATE INDEX "offer_section_banners_offer_section_id_idx" ON "offer_section_banners"("offer_section_id");

-- CreateIndex
CREATE INDEX "offer_section_banners_is_active_idx" ON "offer_section_banners"("is_active");

-- CreateIndex
CREATE INDEX "offer_section_banners_tenant_id_idx" ON "offer_section_banners"("tenant_id");

-- CreateIndex
CREATE INDEX "offer_section_banners_updated_at_idx" ON "offer_section_banners"("updated_at");

-- CreateIndex
CREATE INDEX "sliders_offer_section_id_idx" ON "sliders"("offer_section_id");

-- CreateIndex
CREATE INDEX "sliders_is_active_idx" ON "sliders"("is_active");

-- CreateIndex
CREATE INDEX "sliders_display_order_idx" ON "sliders"("display_order");

-- CreateIndex
CREATE INDEX "sliders_tenant_id_idx" ON "sliders"("tenant_id");

-- CreateIndex
CREATE INDEX "sliders_updated_at_idx" ON "sliders"("updated_at");

-- CreateIndex
CREATE INDEX "menu_items_on_sliders_slider_id_idx" ON "menu_items_on_sliders"("slider_id");

-- CreateIndex
CREATE INDEX "menu_items_on_sliders_menu_item_id_idx" ON "menu_items_on_sliders"("menu_item_id");

-- CreateIndex
CREATE INDEX "restaurants_owner_id_idx" ON "restaurants"("owner_id");

-- CreateIndex
CREATE INDEX "restaurants_email_idx" ON "restaurants"("email");

-- CreateIndex
CREATE INDEX "restaurants_timezone_idx" ON "restaurants"("timezone");

-- CreateIndex
CREATE INDEX "restaurants_currency_idx" ON "restaurants"("currency");

-- CreateIndex
CREATE INDEX "restaurants_brand_id_idx" ON "restaurants"("brand_id");

-- CreateIndex
CREATE INDEX "brands_tenant_id_idx" ON "brands"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_parent_id_idx" ON "categories"("parent_id");

-- CreateIndex
CREATE INDEX "categories_slug_idx" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_is_active_idx" ON "categories"("is_active");

-- CreateIndex
CREATE INDEX "categories_order_idx" ON "categories"("order");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_sku_key" ON "menu_items"("sku");

-- CreateIndex
CREATE INDEX "menu_items_restaurant_id_idx" ON "menu_items"("restaurant_id");

-- CreateIndex
CREATE INDEX "menu_items_sku_idx" ON "menu_items"("sku");

-- CreateIndex
CREATE INDEX "menu_items_stock_status_idx" ON "menu_items"("stock_status");

-- CreateIndex
CREATE INDEX "menu_items_category_id_idx" ON "menu_items"("category_id");

-- CreateIndex
CREATE INDEX "menu_items_category_id_is_active_idx" ON "menu_items"("category_id", "is_active");

-- CreateIndex
CREATE INDEX "menu_items_rating_idx" ON "menu_items"("rating");

-- CreateIndex
CREATE INDEX "menu_items_tenant_id_idx" ON "menu_items"("tenant_id");

-- CreateIndex
CREATE INDEX "menu_items_brand_id_idx" ON "menu_items"("brand_id");

-- CreateIndex
CREATE INDEX "menu_items_color_idx" ON "menu_items"("color");

-- CreateIndex
CREATE INDEX "menu_items_is_visible_idx" ON "menu_items"("is_visible");

-- CreateIndex
CREATE INDEX "menu_items_is_active_idx" ON "menu_items"("is_active");

-- CreateIndex
CREATE INDEX "menu_items_is_featured_idx" ON "menu_items"("is_featured");

-- CreateIndex
CREATE INDEX "menu_items_created_at_idx" ON "menu_items"("created_at");

-- CreateIndex
CREATE INDEX "menu_items_updated_at_idx" ON "menu_items"("updated_at");

-- CreateIndex
CREATE INDEX "menu_items_deal_section_id_idx" ON "menu_items"("deal_section_id");

-- CreateIndex
CREATE INDEX "menu_items_new_arrivals_section_id_idx" ON "menu_items"("new_arrivals_section_id");

-- CreateIndex
CREATE INDEX "menu_items_tab_id_idx" ON "menu_items"("tab_id");

-- CreateIndex
CREATE INDEX "menu_item_variants_menu_item_id_idx" ON "menu_item_variants"("menu_item_id");

-- CreateIndex
CREATE INDEX "menu_item_variants_is_active_idx" ON "menu_item_variants"("is_active");

-- CreateIndex
CREATE INDEX "menu_item_images_menu_item_id_idx" ON "menu_item_images"("menu_item_id");

-- CreateIndex
CREATE INDEX "menu_item_images_is_primary_idx" ON "menu_item_images"("is_primary");

-- CreateIndex
CREATE INDEX "menu_item_images_order_idx" ON "menu_item_images"("order");

-- CreateIndex
CREATE INDEX "menu_item_specifications_menu_item_id_idx" ON "menu_item_specifications"("menu_item_id");

-- CreateIndex
CREATE INDEX "menu_item_attributes_menu_item_id_idx" ON "menu_item_attributes"("menu_item_id");

-- CreateIndex
CREATE INDEX "menu_item_price_history_menu_item_id_idx" ON "menu_item_price_history"("menu_item_id");

-- CreateIndex
CREATE INDEX "menu_item_price_history_variant_id_idx" ON "menu_item_price_history"("variant_id");

-- CreateIndex
CREATE INDEX "menu_item_reviews_menu_item_id_idx" ON "menu_item_reviews"("menu_item_id");

-- CreateIndex
CREATE INDEX "menu_item_reviews_user_id_idx" ON "menu_item_reviews"("user_id");

-- CreateIndex
CREATE INDEX "related_menu_items_menu_item_id_idx" ON "related_menu_items"("menu_item_id");

-- CreateIndex
CREATE INDEX "related_menu_items_related_item_id_idx" ON "related_menu_items"("related_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "related_menu_items_menu_item_id_related_item_id_key" ON "related_menu_items"("menu_item_id", "related_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_slug_idx" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_name_idx" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_type_idx" ON "tags"("type");

-- CreateIndex
CREATE INDEX "menus_restaurant_id_idx" ON "menus"("restaurant_id");

-- CreateIndex
CREATE INDEX "menus_tenant_id_idx" ON "menus"("tenant_id");

-- CreateIndex
CREATE INDEX "menus_is_active_idx" ON "menus"("is_active");

-- CreateIndex
CREATE INDEX "menus_name_idx" ON "menus"("name");

-- CreateIndex
CREATE INDEX "menu_items_on_menus_menu_id_idx" ON "menu_items_on_menus"("menu_id");

-- CreateIndex
CREATE INDEX "menu_item_recommendations_source_menu_item_id_idx" ON "menu_item_recommendations"("source_menu_item_id");

-- CreateIndex
CREATE INDEX "menu_item_recommendations_target_menu_item_id_idx" ON "menu_item_recommendations"("target_menu_item_id");

-- CreateIndex
CREATE INDEX "menu_item_recommendations_reason_idx" ON "menu_item_recommendations"("reason");

-- CreateIndex
CREATE UNIQUE INDEX "menu_item_recommendations_source_menu_item_id_target_menu_i_key" ON "menu_item_recommendations"("source_menu_item_id", "target_menu_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_correlation_id_key" ON "orders"("correlation_id");

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "orders_restaurant_id_idx" ON "orders"("restaurant_id");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_payment_status_idx" ON "orders"("payment_status");

-- CreateIndex
CREATE INDEX "orders_order_type_idx" ON "orders"("order_type");

-- CreateIndex
CREATE INDEX "orders_tenant_id_idx" ON "orders"("tenant_id");

-- CreateIndex
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");

-- CreateIndex
CREATE INDEX "orders_updated_at_idx" ON "orders"("updated_at");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "order_items_menu_item_id_idx" ON "order_items"("menu_item_id");

-- CreateIndex
CREATE INDEX "order_audits_order_id_idx" ON "order_audits"("order_id");

-- CreateIndex
CREATE INDEX "order_audits_changed_by_idx" ON "order_audits"("changed_by");

-- CreateIndex
CREATE INDEX "order_audits_timestamp_idx" ON "order_audits"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transaction_id_key" ON "payments"("transaction_id");

-- CreateIndex
CREATE INDEX "payments_order_id_idx" ON "payments"("order_id");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_method_idx" ON "payments"("method");

-- CreateIndex
CREATE INDEX "payments_transaction_id_idx" ON "payments"("transaction_id");

-- CreateIndex
CREATE INDEX "payments_created_at_idx" ON "payments"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_order_id_key" ON "deliveries"("order_id");

-- CreateIndex
CREATE INDEX "deliveries_driver_id_idx" ON "deliveries"("driver_id");

-- CreateIndex
CREATE INDEX "deliveries_status_idx" ON "deliveries"("status");

-- CreateIndex
CREATE INDEX "deliveries_tenant_id_idx" ON "deliveries"("tenant_id");

-- CreateIndex
CREATE INDEX "deliveries_created_at_idx" ON "deliveries"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_user_id_key" ON "drivers"("user_id");

-- CreateIndex
CREATE INDEX "drivers_tenant_id_idx" ON "drivers"("tenant_id");

-- CreateIndex
CREATE INDEX "drivers_is_active_idx" ON "drivers"("is_active");

-- CreateIndex
CREATE INDEX "drivers_user_id_idx" ON "drivers"("user_id");

-- CreateIndex
CREATE INDEX "order_cancellations_order_id_idx" ON "order_cancellations"("order_id");

-- CreateIndex
CREATE INDEX "order_cancellations_status_idx" ON "order_cancellations"("status");

-- CreateIndex
CREATE INDEX "order_cancellations_requested_by_idx" ON "order_cancellations"("requested_by");

-- CreateIndex
CREATE UNIQUE INDEX "allergens_name_key" ON "allergens"("name");

-- CreateIndex
CREATE INDEX "allergens_tenant_id_idx" ON "allergens"("tenant_id");

-- CreateIndex
CREATE INDEX "allergens_name_idx" ON "allergens"("name");

-- CreateIndex
CREATE INDEX "menu_item_allergens_allergen_id_idx" ON "menu_item_allergens"("allergen_id");

-- CreateIndex
CREATE INDEX "tax_rates_restaurant_id_idx" ON "tax_rates"("restaurant_id");

-- CreateIndex
CREATE INDEX "tax_rates_tenant_id_idx" ON "tax_rates"("tenant_id");

-- CreateIndex
CREATE INDEX "tax_rates_is_active_idx" ON "tax_rates"("is_active");

-- CreateIndex
CREATE INDEX "tax_rates_name_idx" ON "tax_rates"("name");

-- CreateIndex
CREATE INDEX "inventory_menu_item_id_idx" ON "inventory"("menu_item_id");

-- CreateIndex
CREATE INDEX "inventory_variant_id_idx" ON "inventory"("variant_id");

-- CreateIndex
CREATE INDEX "inventory_status_idx" ON "inventory"("status");

-- CreateIndex
CREATE INDEX "inventory_tenant_id_idx" ON "inventory"("tenant_id");

-- CreateIndex
CREATE INDEX "inventory_restaurant_id_idx" ON "inventory"("restaurant_id");

-- CreateIndex
CREATE INDEX "inventory_quantity_idx" ON "inventory"("quantity");

-- CreateIndex
CREATE INDEX "inventory_supplier_id_idx" ON "inventory"("supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_restaurant_id_menu_item_id_variant_id_key" ON "inventory"("restaurant_id", "menu_item_id", "variant_id");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_email_key" ON "suppliers"("email");

-- CreateIndex
CREATE INDEX "suppliers_tenant_id_idx" ON "suppliers"("tenant_id");

-- CreateIndex
CREATE INDEX "suppliers_is_active_idx" ON "suppliers"("is_active");

-- CreateIndex
CREATE INDEX "loyalty_programs_tenant_id_idx" ON "loyalty_programs"("tenant_id");

-- CreateIndex
CREATE INDEX "loyalty_programs_is_active_idx" ON "loyalty_programs"("is_active");

-- CreateIndex
CREATE INDEX "loyalty_programs_name_idx" ON "loyalty_programs"("name");

-- CreateIndex
CREATE INDEX "loyalty_transactions_user_id_idx" ON "loyalty_transactions"("user_id");

-- CreateIndex
CREATE INDEX "loyalty_transactions_order_id_idx" ON "loyalty_transactions"("order_id");

-- CreateIndex
CREATE INDEX "loyalty_transactions_program_id_idx" ON "loyalty_transactions"("program_id");

-- CreateIndex
CREATE INDEX "loyalty_transactions_transactionType_idx" ON "loyalty_transactions"("transactionType");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_channel_idx" ON "notifications"("channel");

-- CreateIndex
CREATE INDEX "notifications_is_read_idx" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "notifications_tenant_id_idx" ON "notifications"("tenant_id");

-- CreateIndex
CREATE INDEX "feedbacks_order_id_idx" ON "feedbacks"("order_id");

-- CreateIndex
CREATE INDEX "feedbacks_user_id_idx" ON "feedbacks"("user_id");

-- CreateIndex
CREATE INDEX "feedbacks_type_idx" ON "feedbacks"("type");

-- CreateIndex
CREATE INDEX "feedbacks_rating_idx" ON "feedbacks"("rating");

-- CreateIndex
CREATE INDEX "feedbacks_created_at_idx" ON "feedbacks"("created_at");

-- CreateIndex
CREATE INDEX "feedbacks_tenant_id_idx" ON "feedbacks"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE INDEX "permissions_category_idx" ON "permissions"("category");

-- CreateIndex
CREATE INDEX "role_permissions_permission_id_idx" ON "role_permissions"("permission_id");

-- CreateIndex
CREATE INDEX "role_permissions_role_idx" ON "role_permissions"("role");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refresh_token_key" ON "sessions"("refresh_token");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sessions_token_idx" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "sessions_refresh_token_idx" ON "sessions"("refresh_token");

-- CreateIndex
CREATE INDEX "sessions_expires_at_idx" ON "sessions"("expires_at");

-- CreateIndex
CREATE INDEX "support_tickets_user_id_idx" ON "support_tickets"("user_id");

-- CreateIndex
CREATE INDEX "support_tickets_order_id_idx" ON "support_tickets"("order_id");

-- CreateIndex
CREATE INDEX "support_tickets_status_idx" ON "support_tickets"("status");

-- CreateIndex
CREATE INDEX "support_tickets_priority_idx" ON "support_tickets"("priority");

-- CreateIndex
CREATE INDEX "support_tickets_assigned_to_idx" ON "support_tickets"("assigned_to");

-- CreateIndex
CREATE INDEX "support_tickets_tenant_id_idx" ON "support_tickets"("tenant_id");

-- CreateIndex
CREATE INDEX "support_tickets_created_at_idx" ON "support_tickets"("created_at");

-- CreateIndex
CREATE INDEX "support_tickets_updated_at_idx" ON "support_tickets"("updated_at");

-- CreateIndex
CREATE INDEX "support_responses_ticket_id_idx" ON "support_responses"("ticket_id");

-- CreateIndex
CREATE INDEX "support_responses_responder_id_idx" ON "support_responses"("responder_id");

-- CreateIndex
CREATE INDEX "support_responses_created_at_idx" ON "support_responses"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_account_status_idx" ON "users"("account_status");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_number_idx" ON "users"("phone_number");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE INDEX "users_updated_at_idx" ON "users"("updated_at");

-- CreateIndex
CREATE INDEX "user_audits_user_id_idx" ON "user_audits"("user_id");

-- CreateIndex
CREATE INDEX "user_audits_operation_idx" ON "user_audits"("operation");

-- CreateIndex
CREATE INDEX "user_audits_timestamp_idx" ON "user_audits"("timestamp");

-- CreateIndex
CREATE INDEX "addresses_user_id_idx" ON "addresses"("user_id");

-- CreateIndex
CREATE INDEX "addresses_tenant_id_idx" ON "addresses"("tenant_id");

-- CreateIndex
CREATE INDEX "addresses_is_default_idx" ON "addresses"("is_default");

-- CreateIndex
CREATE INDEX "wishlists_user_id_idx" ON "wishlists"("user_id");

-- CreateIndex
CREATE INDEX "wishlists_menu_item_id_idx" ON "wishlists"("menu_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlists_user_id_menu_item_id_key" ON "wishlists"("user_id", "menu_item_id");

-- CreateIndex
CREATE INDEX "_MenuItemTags_B_index" ON "_MenuItemTags"("B");

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_queries" ADD CONSTRAINT "search_queries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_queries" ADD CONSTRAINT "search_queries_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts_on_tags" ADD CONSTRAINT "blog_posts_on_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts_on_tags" ADD CONSTRAINT "blog_posts_on_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "blog_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "blog_comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "menu_item_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "new_arrivals_tabs" ADD CONSTRAINT "new_arrivals_tabs_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "new_arrivals_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_section_banners" ADD CONSTRAINT "offer_section_banners_offer_section_id_fkey" FOREIGN KEY ("offer_section_id") REFERENCES "offer_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sliders" ADD CONSTRAINT "sliders_offer_section_id_fkey" FOREIGN KEY ("offer_section_id") REFERENCES "offer_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items_on_sliders" ADD CONSTRAINT "menu_items_on_sliders_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items_on_sliders" ADD CONSTRAINT "menu_items_on_sliders_slider_id_fkey" FOREIGN KEY ("slider_id") REFERENCES "sliders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_tax_rate_id_fkey" FOREIGN KEY ("tax_rate_id") REFERENCES "tax_rates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_deal_section_id_fkey" FOREIGN KEY ("deal_section_id") REFERENCES "deal_sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_new_arrivals_section_id_fkey" FOREIGN KEY ("new_arrivals_section_id") REFERENCES "new_arrivals_sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_tab_id_fkey" FOREIGN KEY ("tab_id") REFERENCES "new_arrivals_tabs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_audits" ADD CONSTRAINT "menu_item_audits_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_variants" ADD CONSTRAINT "menu_item_variants_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_images" ADD CONSTRAINT "menu_item_images_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_specifications" ADD CONSTRAINT "menu_item_specifications_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_attributes" ADD CONSTRAINT "menu_item_attributes_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_price_history" ADD CONSTRAINT "menu_item_price_history_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_price_history" ADD CONSTRAINT "menu_item_price_history_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "menu_item_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_reviews" ADD CONSTRAINT "menu_item_reviews_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_reviews" ADD CONSTRAINT "menu_item_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_menu_items" ADD CONSTRAINT "related_menu_items_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_menu_items" ADD CONSTRAINT "related_menu_items_related_item_id_fkey" FOREIGN KEY ("related_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items_on_menus" ADD CONSTRAINT "menu_items_on_menus_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items_on_menus" ADD CONSTRAINT "menu_items_on_menus_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_recommendations" ADD CONSTRAINT "menu_item_recommendations_source_menu_item_id_fkey" FOREIGN KEY ("source_menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_recommendations" ADD CONSTRAINT "menu_item_recommendations_target_menu_item_id_fkey" FOREIGN KEY ("target_menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_audits" ADD CONSTRAINT "order_audits_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_audits" ADD CONSTRAINT "order_audits_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancellations" ADD CONSTRAINT "order_cancellations_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancellations" ADD CONSTRAINT "order_cancellations_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancellations" ADD CONSTRAINT "order_cancellations_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_allergens" ADD CONSTRAINT "menu_item_allergens_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_allergens" ADD CONSTRAINT "menu_item_allergens_allergen_id_fkey" FOREIGN KEY ("allergen_id") REFERENCES "allergens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_rates" ADD CONSTRAINT "tax_rates_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "menu_item_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loyalty_transactions" ADD CONSTRAINT "loyalty_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loyalty_transactions" ADD CONSTRAINT "loyalty_transactions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loyalty_transactions" ADD CONSTRAINT "loyalty_transactions_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "loyalty_programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_responses" ADD CONSTRAINT "support_responses_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "support_tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_responses" ADD CONSTRAINT "support_responses_responder_id_fkey" FOREIGN KEY ("responder_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_audits" ADD CONSTRAINT "user_audits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_audits" ADD CONSTRAINT "user_audits_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemTags" ADD CONSTRAINT "_MenuItemTags_A_fkey" FOREIGN KEY ("A") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemTags" ADD CONSTRAINT "_MenuItemTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
