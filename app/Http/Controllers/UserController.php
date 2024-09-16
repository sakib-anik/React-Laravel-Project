<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $users = User::orderBy('id','desc')->get();
        return response()->json([
            'users' => $users
        ]);
    }

    public function delete($id){
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'status' => true
        ]);
    }
    public function show($id){
        $user = User::find($id);
        return response()->json([
            'status' => true,
            'user' => $user
        ]);
    }
    public function update(Request $request,$id){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => 'required|min:8'
        ]);
        User::updateOrCreate(
            ['email'=>$request->email],
            [
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),

            ]
            );
        return response()->json([
            'status' => true,
        ]);
    }
}