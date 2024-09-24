import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET() {

    try {
        const studentsList = await prisma.students.findMany()
        return NextResponse.json( studentsList )
    } catch ( error ) {

        if ( error instanceof Error ) {
            return NextResponse.json(
                {
                    message: error.message
                },
                {
                    status: 500
                } );
        }

    }
}

export async function POST( request: Request ) {
    try {
        const { name, lastName, badge } = await request.json();

        const newNote = await prisma.students.create( {
            data: {
                name: name,
                lastName: lastName,
                badge: badge

            }
        } )
        return NextResponse.json( newNote )
    } catch ( error ) {
        if ( error instanceof Error ) {
            return NextResponse.json(
                {
                    message: error.message
                },
                {
                    status: 500
                } );
        }
    }
}