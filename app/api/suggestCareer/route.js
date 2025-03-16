import { spawn } from "child_process";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
    try {
        const req = await request.json();
        console.log(req);

        const { course, speclization, certifications: additionalCertificates, working, interests: areaOfInterest, skills } = req;

        const pythonScriptPath = path.join(process.cwd(), "/Scripts/pythonScripts/main.py");

        console.log(pythonScriptPath);

        return new Promise((resolve, reject) => {
            const py = spawn("python", [
                pythonScriptPath,
                "male",
                course,
                speclization,
                additionalCertificates,
                working,
                areaOfInterest,
                skills,
            ]);

            let career = "";
            let errorOutput = "";

            py.stdout.on("data", (data) => {
                try {
                    const res = JSON.parse(data.toString());
                    console.log(res.result);
                    career = res.result;
                } catch (error) {
                    errorOutput = "Error parsing Python output.";
                }
            });

            py.stderr.on("data", (data) => {
                console.log(data.toString());
                errorOutput += data.toString();
            });

            py.on("close", (code) => {
                console.log(`Process ended with return status ${code}`);

                if (errorOutput) {
                    reject(NextResponse.json({ message: "Some error occurred in server", error: errorOutput }, { status: 500 }));
                } else {
                    resolve(NextResponse.json({ message: career }, { status: 200 }));
                }
            });
        });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error: error.toString() }, { status: 500 });
    }
}
