
import mongoose from "mongoose";
import axios from "axios";
import FormData from "form-data";

import CartModel from "../models/CartModel.js";
import ProfileModel from "../models/ProfileModel.js";
import InvoiceModel from "../models/InvoiceModel.js";
import InvoiceProductModel from "../models/InvoiceProductModel.js";
import PaymentSettingModel from "../models/PaymentSettingModel.js";

const ObjectID = mongoose.Types.ObjectId;


export const CreateInvoiceService = async (req) => {
  try {
    const user_id = new ObjectID(req.headers.user_id);
    const cus_email = req.headers?.email;

    // Step 01: Calculate Total Payable & VAT
    const CartProducts = await CartModel.aggregate([
      { $match: { userID: user_id } },
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);


    

    let totalAmount = 0;
    CartProducts.forEach((item) => {
      const price = item.product.discount
        ? parseFloat(item.product.discountPrice)
        : parseFloat(item.product.price);
      totalAmount += item.qty * price;
    });

    const vat = totalAmount * 0.05;
    const payable = totalAmount + vat;

    // Step 02: Customer & Shipping Details
    const Profile = await ProfileModel.aggregate([
      { $match: { userID: user_id } },
    ]);

    if (!Profile.length) {
      throw new Error("Customer profile not found");
    }

    const cus_details = `Name:${Profile[0].cus_name}, Email:${cus_email}, Address:${Profile[0].cus_add}, Phone:${Profile[0].cus_phone}`;
    const ship_details = `Name:${Profile[0].ship_name}, City:${Profile[0].ship_city}, Address:${Profile[0].ship_add}, Phone:${Profile[0].ship_phone}`;

    // Step 03: Transaction Details
    const tran_id = Math.floor(10000000 + Math.random() * 90000000);
    const val_id = 0;
    const delivery_status = "pending";
    const payment_status = "pending";

    // Step 04: Create Invoice
    const createInvoice = await InvoiceModel.create({
      userID: user_id,
      payable,
      cus_details,
      ship_details,
      tran_id,
      val_id,
      payment_status,
      delivery_status,
      total: totalAmount,
      vat,
    });

    const invoice_id = createInvoice._id;

    // Step 05: Create Invoice Products
    await Promise.all(
      CartProducts.map((item) =>
        InvoiceProductModel.create({
          userID: user_id,
          productID: item.productID,
          invoiceID: invoice_id,
          qty: item.qty,
          price: item.product.discount
            ? item.product.discountPrice
            : item.product.price,
          color: item.color,
          size: item.size,
        })
      )
    );

    console.log(CartProducts);
    

    // Step 06: Clear Cart
    await CartModel.deleteMany({ userID: user_id });

   
    

    // Step 07: Prepare SSL Payment

    const PaymentSettings = await PaymentSettingModel.find();
    if (!PaymentSettings.length) {
      throw new Error("Payment settings not configured");
    }

    const settings = PaymentSettings[0];

    const form = new FormData();
    form.append("store_id", settings.store_id);
    form.append("store_passwd", settings.store_passwd);
    form.append("total_amount", payable.toString());
    form.append("currency", settings.currency);
    form.append("tran_id", tran_id);

    form.append("success_url", `${settings.success_url}/${tran_id}`);
    form.append("fail_url", `${settings.fail_url}/${tran_id}`);
    form.append("cancel_url", `${settings.cancel_url}/${tran_id}`);
    form.append("ipn_url", `${settings.ipn_url}/${tran_id}`);

    form.append("cus_name", Profile[0].cus_name);
    form.append("cus_email", cus_email);
    form.append("cus_add1", Profile[0].cus_add);
    form.append("cus_add2", Profile[0].cus_add);
    form.append("cus_city", Profile[0].cus_city);
    form.append("cus_state", Profile[0].cus_state);
    form.append("cus_postcode", Profile[0].cus_postcode);
    form.append("cus_country", Profile[0].cus_country);
    form.append("cus_phone", Profile[0].cus_phone);
    form.append("cus_fax", Profile[0].cus_phone);

    form.append("shipping_method", "YES");
    form.append("ship_name", Profile[0].ship_name);
    form.append("ship_add1", Profile[0].ship_add);
    form.append("ship_add2", Profile[0].ship_add);
    form.append("ship_city", Profile[0].ship_city);
    form.append("ship_state", Profile[0].ship_state);
    form.append("ship_country", Profile[0].ship_country);
    form.append("ship_postcode", Profile[0].ship_postcode);

    form.append("product_name", "According Invoice");
    form.append("product_category", "According Invoice");
    form.append("product_profile", "According Invoice");
    form.append("product_amount", "According Invoice");

    const SSLRes = await axios.post(settings.init_url, form, {
      headers: form.getHeaders(),
    });

    return {
      status: "success",
      data: {
        sslResponse: SSLRes.data,
        tran_id: tran_id,
        // CartProducts
      },
    };
  } catch (e) {

    return {
      status: "fail",
      message: e.toString(),
    };
  }
};




export const InvoiceListService = async (req) => {
  try {
    const user_id = new ObjectID(req.headers.user_id) 
    const invoice = await InvoiceModel.find({ userID: user_id });
    console.log(user_id);
    console.log(invoice);
    return { status: "success", data: invoice };
  } catch (error) {
    return { status: "fail", message: "Something Went Wrong", error };
  }
};



export const InvoiceProductListService = async (req) => {
  try {
    const user_id = new ObjectID(req.headers.user_id);
    const invoice_id = new ObjectID(req.params.invoice_id);
    console.log(user_id);
    console.log(invoice_id);

    const products = await InvoiceProductModel.aggregate([
      { $match: { userID: user_id, invoiceID: invoice_id } },
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "products",
        },
      },
      { $unwind: "$products" },
    ]);

    
  console.log(products);
    return { status: "success", data: products };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};




export const PaymentSuccessService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "success" }
    );
    return { status: "success" };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const PaymentFailService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "fail" }
    );
    return { status: "fail" };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const PaymentCancelService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "cancel" }
    );
    return { status: "cancel" };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const PaymentIPNService = async (req) => {
  try {
    const trxID = req.params.trxID;
    const status = req.body.status;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: status }
    );
    return { status: "success" };
  } catch {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

