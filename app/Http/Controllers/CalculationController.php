<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Calculation;

class CalculationController extends Controller
{
  public function index(Request $request)
  {
    $storedCalculation = Calculation::where('function', $request->function)->first();

    if (empty($storedCalculation)) return ['success' => false];

    return ['success' => true, 'result' => $storedCalculation];
  }

  public function store(Request $request)
  {
    $newCalculation = new Calculation;
    $newCalculation->function = $request->function;
    $newCalculation->solution = $request->solution;

    $newCalculation->save();

    return ['success' => true];
  }
}
