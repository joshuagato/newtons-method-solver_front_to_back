<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Newton's Method Solver</title>

    <!-- Fonts -->

    <!-- Styles -->
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div id="root"></div>

    <script src="{{asset('js/app.js')}}" ></script>
  </body>
</html>
