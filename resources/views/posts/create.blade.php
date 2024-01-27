@section('title', 'New Post')
@extends('layout')

@section('content')

<h1 class="title">Criar novo post</h1>

<form method="post" action="{{ route('posts.store') }}">

    @csrf
    @include('partials.errors')

    <div class="field">
        <label class="label">Titulo</label>
        <div class="control">
            <input type="text" name="title" value="{{ old('title') }}" class="input" placeholder="Title" minlength="5" maxlength="100" required />
        </div>
    </div>

    <div class="field">
        <label class="label">Conteúdo</label>
        <div class="control">
            <textarea name="content" class="textarea" placeholder="Content" minlength="5" maxlength="2000" required rows="10">{{ old('content') }}</textarea>
        </div>
    </div>

    <div class="field">
        <label class="label">Categoria</label>
        <div class="control">
            <div class="select">
                <select name="category" required>
                    <option value="" disabled selected>Selecione</option>
                    <option value="html" {{ old('category') === 'html' ? 'selected' : null }}>HTML</option>
                    <option value="css" {{ old('category') === 'css' ? 'selected' : null }}>CSS</option>
                    <option value="javascript" {{ old('category') === 'javascript' ? 'selected' : null }}>JavaScript</option>
                    <option value="php" {{ old('category') === 'php' ? 'selected' : null }}>PHP</option>
                </select>
            </div>
        </div>
    </div>

    <div class="field">
        <div class="control">
            <button type="submit" class="button is-link is-outlined">Publicar</button>
        </div>
    </div>

</form>

@endsection