import { Separator } from "@/components/ui/separator";
import {StudentProfileDisplay} from "@/components/form/StudentProfileDemoForm";

const StuProfile = () => {
    return (
        <section className="space-y-6">
            <Separator />
            <StudentProfileDisplay />
        </section>
    )
}

export default StuProfile