import connect from "@/db";
import Level from "@/models/Level";
import { NextResponse } from "next/server";

// Connect to database
await connect();

export async function POST(request) {
  try {
    // Parse request body
    const { levels } = await request.json();

    // Validate request body structure
    if (!Array.isArray(levels) || levels.length === 0) {
      return NextResponse.json(
        { error: "Request body must contain an array of levels" },
        { status: 400 }
      );
    }

    // Validate each level object
    const invalidLevels = levels.filter(
      level => !level.levelNumber || !level.question || !level.answer
    );

    if (invalidLevels.length > 0) {
      return NextResponse.json(
        {
          error: "Some levels are missing required fields",
          invalidLevels
        },
        { status: 400 }
      );
    }

    // Check for duplicate level numbers in the request
    const levelNumbers = levels.map(level => level.levelNumber);
    const uniqueLevelNumbers = new Set(levelNumbers);
    
    if (levelNumbers.length !== uniqueLevelNumbers.size) {
      const duplicates = levelNumbers.filter(
        (num, index) => levelNumbers.indexOf(num) !== index
      );
      
      return NextResponse.json(
        { 
          error: "Duplicate level numbers detected", 
          duplicateLevels: duplicates 
        },
        { status: 400 }
      );
    }

    // Check for existing levels in database
    const existingLevels = await Level.find({
      levelNumber: { $in: levelNumbers }
    });

    if (existingLevels.length > 0) {
      return NextResponse.json(
        {
          error: "Some levels already exist in database",
          existingLevelNumbers: existingLevels.map(level => level.levelNumber)
        },
        { status: 409 }
      );
    }

    // Prepare levels with default points if not provided
    const levelsToCreate = levels.map(level => ({
      levelNumber: level.levelNumber,
      question: level.question,
      answer: level.answer,
      points: level.points || 1000
    }));

    // Insert all levels
    const createdLevels = await Level.insertMany(levelsToCreate);

    // Return success response
    return NextResponse.json(
      {
        message: "Levels created successfully",
        count: createdLevels.length,
        levels: createdLevels
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating levels:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongoServerError') {
      if (error.code === 11000) {
        return NextResponse.json(
          { error: "Duplicate key error. Some levels already exist." },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "An error occurred while creating the levels" },
      { status: 500 }
    );
  }
}