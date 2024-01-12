<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Books;

class BooksController extends Controller
{
    public function index(){
        $books = Books::all();
        return response()->json($books);
    }

    public function store(Request $request){
        $book = new Books();
        $book->name = $request->name;
        $book->author = $request->author;
        $book->publish_date = $request->publish_date;
        $book->save();
        return response()->json([
            "Mensagem" => "Livro adicionado com sucesso"
        ], 201);
    }

    public function show($id){
        $book = Books::find($id);
        if(!empty($book)){
            return response()->json($book);
        }
        else{
            return response()->json([
                "Mensagem" => "Livro não encontrado"
            ], 404);
        }
    }

    public function update(Request $request, $id){
        if (Books::where('id', $id)->exists()){
            $book = Books::find($id);
            $book->name = is_null($request->name) ? $book->name : $request->name;
            $book->author = is_null($request->author) ? $book->author : $request->author;
            $book->publish_date = is_null($request->publish_date) ? $book->publish_date : $request->publish_date;
            $book->save();
                return response()->json([
                 "Mensagem" => "Livro atualizado com sucesso"
                ], 201);
        }
        else{
                return response()->json([
                    "Mensagem" => "Livro não encontrado"
                ], 404);
        }
    }
    public function delete($id){
        if (Books::where('id', $id)->exists()){
            $book = Books::find($id);
            $book->delete();

            return response()->json([
                "Mensagem" => "Livro deletado com sucesso"
            ], 201);
     } else {
            return response()->json([
                "Mensagem" => "Livro não encontrado"
            ], 404);
        }
    }
}
