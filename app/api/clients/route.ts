import { Client } from '@/models/client';
import { Shop } from '@/models/shop';
import { IAddClientParams, IDeleteClientParams } from '@/types/api/client';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';

export async function GET() {
  try {
    await dbConnect();

    const clients = await Client.find({}).populate('shops').populate('payments').exec();

    return createHttpResponse('success', 'Clients fetched successfully', clients);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = (await req.json()) as IAddClientParams;
    const {
      firstName,
      lastName,
      nid,
      brnNumber,
      phoneNumber,
      mobileNumber,
      email,
      shops,
      deliveryDateTime,
      payments
    } = body;

    let shopId = null;
    // @todo to check if a required field is needed, consult product route.
    if (shops) {
      const newShop = new Shop(shops[0]);
      shopId = newShop._id;
      await newShop.save();
    }

    const newClient = new Client({
      firstName,
      lastName,
      nid,
      brnNumber,
      mobileNumber,
      phoneNumber,
      email,
      shops: [shopId],
      deliveryDateTime,
      payments
    });
    await newClient.save();

    const populatedClient = await Client.findById(newClient._id)
      .populate('shops')
      .populate('payments')
      .exec();

    return createHttpResponse('success', 'Client created successfully', populatedClient, 201);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const body = (await req.json()) as IDeleteClientParams;
    const { id } = body;

    if (!id) {
      return createHttpResponse('fail', 'Client id is required', null, 400);
    }

    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return createHttpResponse('fail', 'Client not found', null, 404);
    }

    return createHttpResponse('success', 'Client deleted successfully', null);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}
