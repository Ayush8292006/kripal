import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Eye,
  Tag,
  Sparkles,
  Layers,
  Award,
  Search,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES_CONFIG } from '../data/products';
import { AVAILABLE_COUPONS } from '../data/config';
import { Product, Order } from '../types';
import { formatINR } from '../utils/formatters';
import { useToast } from '../components/common/Toast';

export const AdminPage: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'coupons'>('dashboard');

  // Products state (CRUD)
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [productSearch, setProductSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(1499);
  const [newOriginalPrice, setNewOriginalPrice] = useState(2499);
  const [newCategory, setNewCategory] = useState<any>('rings');
  const [newMetal, setNewMetal] = useState<any>('925 Sterling Silver');
  const [newStock, setNewStock] = useState(20);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80');

  // Orders state
  const [ordersList, setOrdersList] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kripal_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'ORD-109284',
        orderNumber: 'KP-882194',
        createdAt: new Date().toISOString(),
        items: [{ product: PRODUCTS[0], quantity: 1, selectedSize: '7' }],
        subtotal: 1499,
        discount: 150,
        giftWrap: true,
        shipping: 0,
        total: 1349,
        shippingAddress: {
          id: 'addr-1',
          fullName: 'Bhavna Vaghani',
          phone: '9876543210',
          addressLine1: '402, Shivalik Pride, Kuvadava Road',
          city: 'Rajkot',
          state: 'Gujarat',
          pincode: '360003',
          type: 'home',
        },
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        orderStatus: 'Placed',
        estimatedDelivery: 'Nov 10, 2026',
        trackingNumber: 'DEL-991204',
      },
    ];
  });

  // Coupons state
  const [couponsList, setCouponsList] = useState(AVAILABLE_COUPONS);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(200);

  // Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: 'kp-' + Date.now(),
      name: newName,
      slug: newName.toLowerCase().replace(/\s+/g, '-'),
      description: 'Handcrafted pure 925 sterling silver from Rajkot atelier.',
      price: Number(newPrice),
      originalPrice: Number(newOriginalPrice),
      discountPercent: Math.round(((newOriginalPrice - newPrice) / newOriginalPrice) * 100),
      category: newCategory,
      categoryName: newCategory.replace('-', ' '),
      metal: newMetal,
      gender: 'Women',
      rating: 5.0,
      reviewCount: 1,
      images: [newImage],
      purity: '925 Sterling Silver',
      weightGrams: 4.5,
      inStock: true,
      stockCount: Number(newStock),
      details: {
        material: '925 Silver',
        plating: 'Rhodium',
        warranty: '6 Months',
        care: ['Clean with cloth'],
      },
    };

    setProductsList([created, ...productsList]);
    setShowAddModal(false);
    showToast({ title: 'Product Added', description: `${newName} added to catalog.`, type: 'success' });
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    setProductsList(productsList.filter((p) => p.id !== id));
    showToast({ title: 'Product Deleted', type: 'info' });
  };

  // Update order status
  const handleStatusChange = (orderId: string, status: any) => {
    const updated = ordersList.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o));
    setOrdersList(updated);
    localStorage.setItem('kripal_orders', JSON.stringify(updated));
    showToast({ title: 'Order Updated', description: `Status changed to ${status}`, type: 'success' });
  };

  // Add coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    setCouponsList([
      ...couponsList,
      {
        code: newCouponCode.toUpperCase(),
        discountType: 'fixed',
        discountValue: Number(newCouponDiscount),
        minOrderValue: 1499,
        description: `Flat ₹${newCouponDiscount} OFF for patrons`,
      },
    ]);
    setNewCouponCode('');
    showToast({ title: 'Coupon Created', type: 'success' });
  };

  const filteredCatalog = productsList.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="bg-[#FAF2F4]/50 min-h-screen py-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-white p-6 rounded-luxury border border-brand-border shadow-xs mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blush-light text-blush-deep flex items-center justify-center font-bold">
              KP
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-blush-deep">
                Admin Management Console
              </span>
              <h1 className="font-serif text-2xl font-bold text-brand-black">
                Kripal Jewellers Rajkot
              </h1>
            </div>
          </div>

          <div className="flex space-x-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'products', label: 'Products', icon: ShoppingBag },
              { id: 'orders', label: 'Orders', icon: Layers },
              { id: 'coupons', label: 'Coupons', icon: Tag },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-luxury text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    isActive
                      ? 'bg-brand-dark text-white shadow-sm'
                      : 'bg-blush-light text-brand-dark hover:bg-blush-accent/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-luxury bg-white border border-brand-border shadow-xs">
                <span className="text-xs text-brand-gray">Revenue Today</span>
                <p className="font-serif text-3xl font-bold text-brand-black mt-1">₹48,920</p>
                <span className="text-[11px] text-emerald-600 font-semibold mt-2 block">
                  ↑ 14% vs yesterday
                </span>
              </div>

              <div className="p-6 rounded-luxury bg-white border border-brand-border shadow-xs">
                <span className="text-xs text-brand-gray">Orders Today</span>
                <p className="font-serif text-3xl font-bold text-brand-black mt-1">18 Dispatches</p>
                <span className="text-[11px] text-emerald-600 font-semibold mt-2 block">
                  100% On-time Rajkot dispatch
                </span>
              </div>

              <div className="p-6 rounded-luxury bg-white border border-brand-border shadow-xs">
                <span className="text-xs text-brand-gray">Active Catalog</span>
                <p className="font-serif text-3xl font-bold text-brand-black mt-1">
                  {productsList.length} Designs
                </p>
                <span className="text-[11px] text-brand-gray mt-2 block">
                  925 Hallmarked Pure Silver
                </span>
              </div>

              <div className="p-6 rounded-luxury bg-white border border-brand-border shadow-xs">
                <span className="text-xs text-brand-gray">Customer Satisfaction</span>
                <p className="font-serif text-3xl font-bold text-brand-black mt-1">4.92 ★</p>
                <span className="text-[11px] text-emerald-600 font-semibold mt-2 block">
                  98.6% positive feedback
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="p-6 rounded-luxury bg-white border border-brand-border shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-medium text-brand-black">
                Recent Orders Stream
              </h3>
              <div className="divide-y divide-brand-border/60">
                {ordersList.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-brand-dark">#{ord.orderNumber}</p>
                      <p className="text-brand-gray">{ord.shippingAddress.fullName} · {ord.shippingAddress.city}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{formatINR(ord.total)}</span>
                      <span className="ml-3 px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                        {ord.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products CRUD */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-luxury border border-brand-border shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-brand-gray absolute left-3 top-3" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search catalog by name..."
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-brand-border"
                />
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 rounded-luxury bg-brand-dark text-white text-xs font-semibold flex items-center space-x-1 shadow-card"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Design</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF2F4] text-brand-dark font-semibold border-b border-brand-border">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Metal</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {filteredCatalog.map((prod) => (
                    <tr key={prod.id} className="hover:bg-blush-light/30">
                      <td className="p-3 flex items-center space-x-3">
                        <img
                          src={prod.images[0]}
                          alt=""
                          className="w-10 h-10 rounded object-cover bg-blush-light"
                        />
                        <div>
                          <p className="font-semibold text-brand-dark truncate max-w-[200px]">{prod.name}</p>
                          <span className="text-[10px] text-brand-gray">{prod.slug}</span>
                        </div>
                      </td>
                      <td className="p-3 capitalize">{prod.categoryName}</td>
                      <td className="p-3">{prod.metal}</td>
                      <td className="p-3 font-semibold">{formatINR(prod.price)}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {prod.stockCount} in stock
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-luxury border border-brand-border shadow-xs space-y-6">
            <h2 className="font-serif text-2xl font-medium text-brand-black">Customer Orders</h2>

            <div className="divide-y divide-brand-border">
              {ordersList.map((ord) => (
                <div key={ord.id} className="py-4 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="font-bold text-sm text-brand-dark">#{ord.orderNumber}</span>
                      <p className="text-xs text-brand-gray">
                        {ord.shippingAddress.fullName} (+91 {ord.shippingAddress.phone}) · {ord.shippingAddress.city}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold">{formatINR(ord.total)}</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className="text-xs p-1.5 rounded-lg border border-brand-border bg-white font-semibold cursor-pointer"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Coupons Management */}
        {activeTab === 'coupons' && (
          <div className="bg-white p-6 rounded-luxury border border-brand-border shadow-xs space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-2xl font-medium text-brand-black">Promo & Coupon Codes</h2>
            </div>

            <form onSubmit={handleAddCoupon} className="flex gap-3 max-w-lg">
              <input
                type="text"
                placeholder="Code (e.g. FESTIVE300)"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                required
                className="flex-1 text-xs p-3 rounded-lg border border-brand-border font-mono uppercase"
              />
              <input
                type="number"
                placeholder="Discount (₹)"
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                required
                className="w-28 text-xs p-3 rounded-lg border border-brand-border font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-dark text-white rounded-lg text-xs font-semibold uppercase"
              >
                Add Code
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {couponsList.map((c) => (
                <div key={c.code} className="p-4 rounded-luxury bg-blush-light border border-brand-border space-y-1">
                  <span className="font-mono font-bold text-sm text-blush-deep">{c.code}</span>
                  <p className="text-xs font-semibold">{c.description}</p>
                  <p className="text-[11px] text-brand-gray">Min purchase: ₹{c.minOrderValue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Add New Product */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setShowAddModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
            <div className="relative bg-white rounded-luxury-lg max-w-lg w-full p-6 z-10 shadow-float max-h-[90vh] overflow-y-auto">
              <h3 className="font-serif text-2xl font-medium mb-4">Add New Silver Design</h3>
              <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-brand-gray mb-1">Product Title</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    placeholder="e.g. Royal Emerald Jhumkas"
                    className="w-full p-2.5 rounded-lg border border-brand-border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-gray mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      required
                      className="w-full p-2.5 rounded-lg border border-brand-border font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-gray mb-1">MRP Price (₹)</label>
                    <input
                      type="number"
                      value={newOriginalPrice}
                      onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                      required
                      className="w-full p-2.5 rounded-lg border border-brand-border font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-gray mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-brand-border"
                    >
                      {CATEGORIES_CONFIG.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand-gray mb-1">Metal</label>
                    <select
                      value={newMetal}
                      onChange={(e) => setNewMetal(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-brand-border"
                    >
                      <option value="925 Sterling Silver">925 Sterling Silver</option>
                      <option value="18K Gold Plated">18K Gold Plated</option>
                      <option value="Rose Gold Plated">Rose Gold Plated</option>
                      <option value="Oxidised Silver">Oxidised Silver</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-brand-gray mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg border border-brand-border"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg border border-brand-border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-brand-dark text-white font-semibold uppercase"
                  >
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

