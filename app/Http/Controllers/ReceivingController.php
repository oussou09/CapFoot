<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\ContactUs;
use App\Models\Receiving;
use App\Models\Stadium;
use App\Models\Time_at;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReceivingController extends Controller
{

    public function index()
    {

    }


    public function create()
    {
        //
    }


    public function storeceiving(Request $request)
    {

        try {
            $validatedData = $request->validate([
                'stadium_id' => 'required|integer|exists:stadiums,id',
                'fullname' => 'required|string|max:255',
                'phone' => 'required|string|regex:/^[+]?[1-9]?[0-9]?[-.\s]?[(]?[0-9]{1,4}[)]?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/|min:10|max:20',
                'time_day' => 'required|string',
                'time_hour' => 'required|string'
            ]);

            $contact = Contact::create([
                'fullname' => $validatedData['fullname'],
                'phone' => $validatedData['phone']
            ]);

            $time_at = Time_at::create([
                'time_day' => $validatedData['time_day'],
                'time_hour' => $validatedData['time_hour']
            ]);

            Receiving::create([
                'stadium_id' => $validatedData['stadium_id'],
                'contact_id' => $contact->id,
                'time_at_id' => $time_at->id,
                'is_confirmed' => false
            ]);

            return response()->json(['message' => 'Reservation created successfully'], 201);

        } catch (\Exception $e) {
            Log::error('Error creating reservation:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error: ' . $e->getMessage()], 500);
        }
    }




    public function showstadiums()
    {
        $stadiums = Stadium::all();
        return response()->json($stadiums);
    }

    public function datareceiving()
    {
        $datareceiving = Receiving::with(['stadium', 'contact', 'timeAt'])->get();
        return response()->json($datareceiving);
    }

    public function storecontactus(Request $request)
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email|max:50',
            'message' => 'required|string|max:500',
        ]);


        // Save the validated data to the database or process it
        ContactUs::create($validatedData);

        return response()->json(['message' => 'Message sent successfully'], 200);
    }

    public function updateconfirmation(Request $request) {

        $datareceiving = $request->validate([
            'id' => 'required|integer',
            'is_confirmed' => 'required|boolean'
        ]);

        $IsId = Receiving::findOrFail($datareceiving['id']);

        $IsId->is_confirmed = $datareceiving['is_confirmed'];

        $IsId->save();

        return response()->json(['message' => 'Confirmation status updated successfully'], 200);
    }


    public function getcontactus()
    {
        $ContactUs = ContactUs::all();
        return response()->json($ContactUs);
    }

    public function deletecontactus(Request $request)
    {
        $ContactUs = ContactUs::findOrFail($request->id);
        $ContactUs->delete();
        return response()->json(['message' => 'Contact deleted successfully']);
    }


    public function addstadium(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'path' => 'required|image|mimes:jpeg,png,jpg,gif|max:4048',
                'stadium_name' => 'required|string|max:255',
                'stadium_many' => 'required|string|max:255',
            ]);

            if ($request->file('path')) {
                $path = $request->file('path')->store('images', 'public');
                $validatedData['path'] = $path; // Save the relative path in the database
            }

            Stadium::create($validatedData);

            return response()->json(['message' => 'Stadium added successfully'], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error: ' . $e->getMessage()], 500);
        }
    }

    public function deletestadium(Request $request)
    {
        $Stadium = Stadium::findOrFail($request->id);
        $Stadium->delete();
        return response()->json(['message' => 'Stadium deleted successfully']);
    }

    public function ReqFormAdmin(Request $request)
    {
        $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials)) {
            $admin = Auth::guard('admin')->user();
            $token = $admin->createToken('admin')->plainTextToken;
            return response()->json([
                'token' => $token,
                'name' => $admin->FullName,
        ], 200);
        }
        return response()->json(['message' => 'Login failed'], 401);

    }

    public function LogoutFormAdmin() {
        Auth::guard('admin')->logout();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }


    public function destroy(Receiving $receiving)
    {
        //
    }







    public function deleteAllReceiving()
{
    // return response()->json(['message' => 'Function work right'], 200);
    try {

        Receiving::truncate(); // This method removes all rows from the table without firing any events.
        return response()->json(['message' => 'All stadiums deleted successfully.'], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to delete stadiums: ' . $e->getMessage()], 500);
    }
}
}
