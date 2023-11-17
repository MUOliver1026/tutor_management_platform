import { StudentProfileUpdateForm } from "@/components/form/StudentProfileUpdateForm";
import { Separator } from "@/components/ui/separator";

const StuProfile = () => {
    return (
        <section className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <StudentProfileUpdateForm />
        </section>
    )
}

export default StuProfile