<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Model\Dog;

class DogController extends Controller
{
    
    public function index()
    {
        return Dog::all();
        
    }
   
    public function store(Request $request)
    {
        Dog::create($request->all());
        return response()->json([
            "Mensagem" => "Criado com sucesso!"
          ], 200);
    }

      public function show($id)
    {
        $dog = Dog::find($id);

        if(isset($dog)){
            
            return $dog;

        }else{
            
            return response()->json([
                "Mensagem" => "Registro não encontrado!"
              ], 404);

        }
    }
    
    public function update(Request $request, $id)
    {
        $dog = Dog::findOrFail($id);
        $dog->update($request->all());

            return response()->json([
                "Mensagem" => "Atualizado com Sucesso!"
            ], 200);
    }

    public function destroy($id)
    {
        $dog = Dog::find($id);
        
        if(isset($dog)){
        
        $dog->delete();
        
            return response()->json([
                "Mensagem" => "Deletado com Sucesso!"
            ], 200);

        }else{

            return response()->json([
                "Mensagem" => "Registro não encontrado!"
              ], 404);
        }
    }
}
