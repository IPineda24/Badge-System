import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
    params: { id: string }
};

export async function GET( request: Request, { params }: Params ) {
    try {
        console.log( params.id )
        const student = await prisma.students.findFirst( {
            where: {
                id: Number( params.id )
            }
        } )
        return NextResponse.json( student )
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

export async function DELETE( request: Request, { params }: Params ) {
    try {
        console.log( params.id )
        const deleteStudent = await prisma.students.delete( {
            where: {
                id: Number( params.id )
            }
        } )

        if ( !deleteStudent )
            return NextResponse.json( { message: 'Student not found' }, { status: 404 } );

        return NextResponse.json( deleteStudent )
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

export async function PUT( request: Request, { params }: Params ) {
    try {

        const { name, lastName, badge } = await request.json();
        const updateStudent = await prisma.students.update( {
            where: {
                id: Number( params.id )
            },
            data: {
                name: name,
                lastName: lastName,
                badge: badge
            }
        } )
        return NextResponse.json( updateStudent )
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